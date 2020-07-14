import ListItem from './listitem'

class List {
  // indentation is the line column index of the first list item marker
  // marker is *, +, or - for unordered lists and ) or . for ordered lists
  // children is the array of list items contained by the list
  constructor(indentation, marker, children = []) {
    this.indentation = indentation;
    this.marker = marker;
    this.children = children;
  }

  // returns the appropriate HTML tag for a list (unordered or ordered)
  static tag(marker) {
    switch (marker) {
      case '*':
      case '+':
      case '-':
        return 'ul';
      case ')':
      case '.':
        return 'ol';
      default:
        throw new Error(`${marker} is an invalid marker`);
    }
  }

  // a convenience constructor for nodes that contain lists
  static parse(token) {
    if (/^(?:[*+-]|\d+[).])$/.test(token.value)) {
      let indentation = token.index.column;
      let marker = token.value[token.value.length - 1];
      let item = new ListItem(token.index.column + token.value.length + 1);
      let list = new List(indentation, marker, [item]);
      return list;
    } else {
      return null;
    }
  }

  // attempts to consume token, returning true if successful
  push(token) {
    // the last list item contained by a list is given higher precedence
    if (this.children.length !== 0) {
      if (this.children[this.children.length - 1].push(token)) {
        return true;
      }
    }

    // if token has sufficient indentation and can be parsed as a list item,
    // create a new list item, consuming token
    if (this.indentation <= token.index.column) {
      let item = ListItem.parse(token, this.marker);
      if (item) {
        this.children.push(item);
        return true;
      }
    }

    return false;
  }
  
  // returns an HTML string representation of the list
  html(depth) {
    let padding = '  '.repeat(depth);
    let tag = List.tag(this.marker);
    let contents = this.children.map(node => node.html(depth + 1)).join("\n");
    return `${padding}<${tag}>\n${contents}\n${padding}</${tag}>`;
  }
}

export default List;
