import { render, screen } from '@testing-library/react';
import App from './App';

test('renders loading placeholder', () => {
  render(<App />);
  const linkElement = screen.getByText(/CatWiki/i);
  expect(linkElement).toBeInTheDocument();
});
