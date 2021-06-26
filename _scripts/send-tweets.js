// Heavily inspired from
// https://mxb.dev/blog/syndicating-content-to-twitter-with-netlify-functions/

const myTwitterUsername = 'nhoizey';

const fetch = require('node-fetch');
const dotenv = require('dotenv');
const moment = require('moment');
const Twitter = require('twitter');
const bent = require('bent');
const getBuffer = bent('buffer');

dotenv.config();

// Configure Twitter API Client
const twitter = new Twitter({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET_KEY,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

// Helper Function to return unknown errors
const handleError = (error) => {
  const msg = Array.isArray(error) ? error[0].message : error.message;
  return status(422, String(msg));
};

// Helper Function to return function status
const status = (code, msg) => {
  console.log(msg);
  return {
    statusCode: code,
    body: msg,
  };
};

// Check exisiting entries
const processFeed = async (feed) => {
  // Keep items published less than 7 days ago
  let items = feed.items.filter((item) =>
    moment(item.date_published).isAfter(moment().subtract(6, 'd'))
  );

  if (!items.length) {
    return status(404, 'No item found to process.');
  }

  // assume the last item is not yet syndicated
  // TODO: manage multiple items not yet syndicated?
  const latestItem = items[0];

  try {
    // check twitter for any tweets containing item URL in last 7 days (API limit).
    // TODO: keep a cache of sent tweets instead of seaching with the API
    // if there are none, publish it.
    const q = await twitter.get('search/tweets', {
      q: `${latestItem.url} from:${myTwitterUsername}`,
      result_type: 'recent',
    });
    if (q.statuses && q.statuses.length === 0) {
      return publishItem(latestItem);
    } else {
      return status(
        200,
        `Latest item already on Twitter: https://twitter.com/${myTwitterUsername}/status/${q.statuses[0].id_str}`
      );
    }
  } catch (error) {
    return handleError(error);
  }
};

// Push a new tweet to Twitter
const publishItem = async (item) => {
  try {
    // TODO: shorten the status text if it's too long, or let the API call fail (current behavior)
    const statusText = item.content_text;
    let tweet;

    console.log(
      `Attempting to post a tweet with ${statusText.length} characters…`
    );

    // Check if there's at least one image attachment
    if (item.hasOwnProperty('attachments') && item.attachments.length > 0) {
      let imagesAttachments = item.attachments.filter((attachment) =>
        // Only keep images
        attachment.mime_type.match('image/')
      );
      if (imagesAttachments.length > 0) {
        let uploadedImages = await Promise.all(
          imagesAttachments.map(async (attachment) => {
            // Get the image as a base64 string
            let imageBuffer = await getBuffer(attachment.url);
            let imageData = await imageBuffer.toString('base64');

            // Upload the image to Twitter
            let media = await twitter.post('media/upload', {
              media_data: imageData,
            });
            return media.media_id_string;
          })
        );

        // Post the tweet with the uploaded image(s)
        tweet = await twitter.post('statuses/update', {
          status: statusText,
          media_ids: uploadedImages.join(','), // Pass the media id string(s)
        });
      } else {
        // There's no image afterall, simple text tweet
        tweet = await twitter.post('statuses/update', {
          status: statusText,
        });
      }
    } else {
      // Simple text tweet
      tweet = await twitter.post('statuses/update', {
        status: statusText,
      });
    }
    if (tweet) {
      return status(
        200,
        `Item "${item.title}" successfully posted to Twitter.`
      );
    } else {
      // TODO: get the actual issue from each call
      return status(422, 'Error posting to Twitter API.');
    }
  } catch (err) {
    return handleError(err);
  }
};

const main = async () => {
  // TODO: use Promise.allSettled to continue even if one is rejected
  let result = await Promise.all(
    [
      'https://nicolas-hoizey.com/feeds/twitter/links.json',
      'https://nicolas-hoizey.com/feeds/twitter/notes.json',
    ].map(async (feedUrl) => {
      return fetch(feedUrl)
        .then((response) => response.json())
        .then(processFeed)
        .catch(handleError);
    })
  );
  // Todo: parse `result` to find potential errors and return accordingly
  return { statusCode: 200, body: JSON.stringify(result) };
};

main();
