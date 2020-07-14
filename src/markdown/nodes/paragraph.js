import escape from '../escape';

class Paragraph {
  // children is the array of tokens contained by the paragraph
  constructor(children = []) {
    this.children = children;
  }

  // a convenience constructor for nodes that contain paragraphs
  static parse(token) {
    // all tokens can start a paragraph
    return new Paragraph([token]);
  }

  // attempts to consume token, returning true if successful
  push(token) {
    let last = this.children[this.children.length - 1];
    // all tokens on the current line of the paragraph are consumed
    if (token.index.row === last.index.row) {
      this.children.push(token);
      return true;
    }
    // tokens on the following line of the paragraph must not start headings or lists
    else if (token.index.row === last.index.row + 1) {
      if (!/^(?:#{1,6}|[*+-]|\d+[).])$/.test(token.value)) {
        this.children.push(token);
        return true;
      }
    }
    return false;
  }

  // returns an HTML string representation of the paragraph
  html(depth) {
    let padding = '  '.repeat(depth);
    let contents = escape(this.children.map(token => token.value).join(' '));
    return `${padding}<p>${contents}</p>`;
  }
}

export default Paragraph;
