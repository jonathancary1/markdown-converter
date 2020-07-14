import Heading from './heading';
import List from './list';
import Paragraph from './paragraph'

class Root {
  // children is the array of nodes contained by the root
  constructor(children = []) {
    this.children = children;
  }

  // attempts to consume token, returning true if successful
  push(token) {
    // the last child contained by the root is given higher precedence
    if (this.children.length !== 0) {
      if (this.children[this.children.length - 1].push(token)) {
        return true;
      }
    }

    // determine is the tokens starts a heading, list, or paragraph
    for (let option of [Heading, List, Paragraph]) {
      let node = option.parse(token);
      if (node) {
        this.children.push(node);
        return true;
      }
    }

    // all tokens start paragraphs, so false will never be returned
    return false;
  }

  // returns an HTML string representation of the root
  html(depth = 0) {
    return this.children.map(node => node.html(depth)).join('\n');
  }
}

export default Root;
