// From https://github.com/philhawksworth/eleventy-notist-example

const axios = require('axios');
const url = 'https://noti.st/nhoizey.json';

module.exports = () => {
  return new Promise((resolve, reject) => {
    axios.get(url).then((response) => {
      let talksData = response.data.data[0].relationships.data;
      let talks = {
        future: [],
        past: []
      };
      let now = new Date();
      talksData.map(talk => {
        let when = new Date(talk.presented_on);
        var future = now - when < 0 ? true : false;
        if (future) {
          talks.future.push(talk);
        } else {
          talks.past.push(talk);
        }
      });
      resolve({ 'url': url, 'talks': talks });
    })
      .catch((error) => {
        reject(error);
      })
  })
}
