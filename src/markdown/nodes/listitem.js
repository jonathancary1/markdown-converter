import Heading from './heading';
import List from './list';
import Paragraph from './paragraph'

class ListItem {
  // indentation is the line column index of the first child of the list item
  // children is the array of nodes contained by the list item
  constructor(indentation, children = []) {
    this.indentation = indentation;
    this.children = children;
  }

  // returns the regular expression for the marker of a list item
  static re(marker) {
    switch (marker) {
      case '*':
        return /^\*$/;
      case '+':
        return /^\+$/;
      case '-':
        return /^-$/;
      case ')':
        return /^\d+\)$/;
      case '.':
        return /^\d+\.$/;
      default:
        throw new Error(`${marker} is an invalid marker`);
    }
  }

  // a convenience constructor for nodes that contain list items
  static parse(token, marker) {
    if (ListItem.re(marker).test(token.value)) {
      return new ListItem(token.index.column + token.value.length + 1);
    } else {
      return null;
    }
  }

  // attempts to consume token, returning true if successful
  push(token) {
    // the last child contained by a list item is given higher precedence
    if (this.children.length !== 0) {
      if (this.children[this.children.length - 1].push(token)) {
        return true;
      }
    }

    // if token has sufficient indentation and starts a list, heading, or paragraph,
    // create a new child, consuming token
    if (this.indentation <= token.index.column) {
      for (let option of [List, Heading, Paragraph]) {
        let node = option.parse(token);
        if (node) {
          if (this.children.length === 0) {
            this.indentation = token.index.column;
          }
          this.children.push(node);
          return true;
        }
      }
    }

    return false;
  }

  // returns an HTML string representation of the list item
  html(depth) {
    let padding = '  '.repeat(depth);
    let contents = this.children.map(node => node.html(depth + 1)).join('\n');
    if (contents === '') {
      return `${padding}<li></li>`;
    } else {
      return `${padding}<li>\n${contents}\n${padding}</li>`;
    }
  }
}

export default ListItem;
