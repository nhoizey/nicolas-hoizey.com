import fetch from 'node-fetch';
import dotenv from 'dotenv';
import Twitter from 'twitter';
import bent from 'bent';
const getBuffer = bent('buffer');

dotenv.config();

// Configure Twitter API Client
const twitter = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.TOKEN,
  access_token_secret: process.env.TOKEN_SECRET,
});

// Helper Function to return unknown errors
const handleError = (error) => {
  console.error(error);
  const msg = Array.isArray(error) ? error[0].message : error.message;
  return {
    statusCode: 422,
    body: String(msg),
  };
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
  let items = feed.items;

  if (!items.length) {
    return status(404, 'No item found to process.');
  }

  // assume the last item is not yet syndicated
  const latestItem = items[0];

  try {
    // check twitter for any tweets containing item URL.
    // if there are none, publish it.
    const q = await twitter.get('search/tweets', { q: latestItem.url });
    if (q.statuses && q.statuses.length === 0) {
      return publishItem(latestItem);
    } else {
      return status(
        400,
        'Latest item was already syndicated. No action taken.'
      );
    }
  } catch (error) {
    return handleError(error);
  }
};

// Push a new note to Twitter
const publishItem = async (item) => {
  try {
    const statusText = item.content_text;

    if (item.hasOwnProperty('attachments') && item.attachments.length > 0) {
      let imageBuffer = await getBuffer(item.attachments[0].url);
      let imageData = await imageBuffer.toString('base64');
      let media = await twitter.post('media/upload', { media_data: imageData });
      tweet = await twitter.post('statuses/update', {
        status: statusText,
        media_ids: media.media_id_string, // Pass the media id string
      });
    } else {
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
      return status(422, 'Error posting to Twitter API.');
    }
  } catch (err) {
    return handleError(err);
  }
};

// Main Lambda Function Handler
export async function handler(event, context) {
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
  console.dir(result);
  return {};
}
