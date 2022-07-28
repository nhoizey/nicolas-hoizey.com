const algolia = require("atomic-algolia");
const fetch = require("node-fetch");

const INDEX_NAME = "nho";
const JSON_URL = "https://nicolas-hoizey.com/tools/algolia.json";

fetch(JSON_URL).then((response) =>
  response.json().then((json) =>
    algolia(INDEX_NAME, json, (error, result) => {
      if (error) throw error;
      console.log(result);
    })
  )
);
