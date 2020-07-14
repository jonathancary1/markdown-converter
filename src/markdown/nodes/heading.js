import escape from '../escape';

class Heading {
  // row is the line index of the heading
  // value is the heading value, ranging from 1 to 6
  // children is the array of tokens contained by the heading
  constructor(row, value, children = []) {
    this.row = row;
    this.value = value;
    this.children = children;
  }

  // a convenience constructor for nodes that could contain headings
  static parse(token) {
    if (/^#{1,6}$/.test(token.value)) {
      return new Heading(token.index.row, token.value.length);
    } else {
      return null;
    }
  }

  // attempts to consume token, returning true if successful
  push(token) {
    // all tokens on the line of a heading are consumed
    if (token.index.row === this.row) {
      this.children.push(token);
      return true;
    } else {
      return false;
    }
  }

  // returns an HTML string representation of the heading
  html(depth) {
    let padding = '  '.repeat(depth);
    let contents = escape(this.children.map(token => token.value).join(" "));
    return `${padding}<h${this.value}>${contents}</h${this.value}>`;
  }
}

export default Heading;
