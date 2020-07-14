import React from 'react';
import { fireEvent, render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../components/app';
import HTMLContainer from '../components/htmlcontainer';

global.fetch = jest.fn(() =>
  Promise.resolve({
    text: () => Promise.resolve('# Markdown')
  })
);

test('fetches introduction.txt', async () => {
  const { getAllByText } = render(<App />);
  await wait(() => expect(getAllByText('Markdown')).toHaveLength(2));
  expect(fetch).toHaveBeenCalledTimes(1);
});

test('toggles html preview', () => {
  const { getByText } = render(<App />);
  const button = getByText('</>');
  expect(button).toBeInTheDocument();
  fireEvent.click(button);
  expect(button).toHaveTextContent('Preview');
});
