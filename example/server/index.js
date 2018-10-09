const express = require("express");
const cors = require("cors");
const app = express();
const faker = require("faker");
const Trie = require("./trie");
const typeAheadData = new Trie();

const defaultSearch = "";
const defaultNumResults = 20;
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/", function(req, res) {
  const results = typeAheadData.topResults(
    req.query.search || defaultSearch,
    req.query.numResults || defaultNumResults
  );
  res.send(results);
});

app.listen(port, () => {
  console.log("Building initial type ahead data");
  generateInitialData(typeAheadData, 5000);
  // build initial trie
  console.log(`Example app listening on port ${port}!`);
});

function generateInitialData(trie, amount) {
  for (let i = 0; i < amount; i++) {
    trie.insert(faker.company.catchPhrase());
  }
}
