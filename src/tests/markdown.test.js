import Heading from '../markdown/nodes/heading';
import List from '../markdown/nodes/list';
import ListItem from '../markdown/nodes/listitem';
import Paragraph from '../markdown/nodes/paragraph';
import Root from '../markdown/nodes/root';
import { parseMarkdown } from '../markdown/markdown';

test('ordered lists', () => {
  for (let marker of [')', '.']) {
    let markdown = `1${marker} A\n2${marker} B\n3${marker} C\n`;
    let a = {index: {row: 0, column: 3}, value: 'A'};
    let b = {index: {row: 1, column: 3}, value: 'B'};
    let c = {index: {row: 2, column: 3}, value: 'C'};
    let root = new Root([new List(0, marker, [
      new ListItem(3, [new Paragraph([a])]),
      new ListItem(3, [new Paragraph([b])]),
      new ListItem(3, [new Paragraph([c])]),
    ])]);
    expect(parseMarkdown(markdown)).toEqual(root);
  }
});

test('unordered lists', () => {
  for (let marker of ['*', '+', '-']) {
    let markdown = `${marker} A\n${marker} B\n${marker} C\n`;
    let a = {index: {row: 0, column: 2}, value: 'A'};
    let b = {index: {row: 1, column: 2}, value: 'B'};
    let c = {index: {row: 2, column: 2}, value: 'C'};
    let root = new Root([new List(0, marker, [
      new ListItem(2, [new Paragraph([a])]),
      new ListItem(2, [new Paragraph([b])]),
      new ListItem(2, [new Paragraph([c])]),
    ])]);
    expect(parseMarkdown(markdown)).toEqual(root);
  }
});

test('embedded lists', () => {
  let markdown = `-\n  -\n    -\n`;
  let root = new Root([
    new List(0, '-', [new ListItem(2, [
      new List(2, '-', [new ListItem(4, [
        new List(4, '-', [new ListItem(6, [])])
      ])])
    ])])
  ]);
  expect(parseMarkdown(markdown)).toEqual(root);
});

test('paragraphs', () => {
  let markdown = 'A\nB\n\nC';
  let a = {index: {row: 0, column: 0}, value: 'A'};
  let b = {index: {row: 1, column: 0}, value: 'B'};
  let c = {index: {row: 3, column: 0}, value: 'C'};
  let root = new Root([
    new Paragraph([a, b]),
    new Paragraph([c])
  ]);
  expect(parseMarkdown(markdown)).toEqual(root);
});

test('headings', () => {
  for (let value of [1, 2, 3, 4, 5, 6]) {
    let markdown = `${'#'.repeat(value)} Heading`;
    let token = {index: {row: 0, column: value + 1}, value: 'Heading'};
    let root = new Root([new Heading(0, value, [token])]);
    expect(parseMarkdown(markdown)).toEqual(root);
  }
});
