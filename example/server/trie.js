class Trie {
  constructor() {
    this.value = null;
    this.parent = null;
    this.children = {};
  }

  insert(word) {
    let curr = this;
    for (var i = 0; i < word.length; i++) {
      if (!curr.children[word[i].toLowerCase()]) {
        const node = new Trie();
        node.value = word.substring(0, i + 1);
        curr.children[word[i].toLowerCase()] = node;
        node.parent = curr;
      }
      curr = curr.children[word[i].toLowerCase()];
    }
  }

  topResults(prefix, numResults) {
    let curr = this;
    const results = [];
    if (prefix === "") {
      return results;
    }
    // get last node of prefix
    for (let i = 0; i < prefix.length; i++) {
      if (!curr.children[prefix[i].toLowerCase()]) {
        return results;
      }
      curr = curr.children[prefix[i].toLowerCase()];
    }

    return this.leavesFrom(curr, numResults);
  }

  leavesFrom(node, numResults) {
    const results = [];
    const queue = [];
    queue.push(node);
    // bfs
    while (queue.length > 0 && results.length < numResults) {
      const curr = queue.shift();
      Object.keys(curr.children).forEach(key => {
        queue.push(curr.children[key]);
      });
      if (Object.keys(curr.children).length === 0) {
        results.push(curr.value);
      }
    }
    return results;
  }
}

module.exports = Trie;
