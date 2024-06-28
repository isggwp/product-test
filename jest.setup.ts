import '@testing-library/jest-dom';
// import { jest } from '@jest/globals';


Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Optional: Configure default mock router implementation if needed
import { useRouter } from 'next/router';
(useRouter as jest.Mock).mockImplementation(() => ({
  route: '/',
  pathname: '',
  query: {},
  asPath: '',
}));
