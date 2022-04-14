import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

test('renders title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Bug Tracker/i);
  expect(linkElement).toBeInTheDocument();
});

test('it creates a new bug', () => {
  render(<App />);
  const inputEl = screen.getByTestId('newBugDescription')
  userEvent.type(inputEl, 'test bug 123');
  const addBtn = screen.getByTestId('addBtn')
  fireEvent.click(addBtn)
  expect(screen.getByText(/test bug 123/i)).toBeInTheDocument();
});
