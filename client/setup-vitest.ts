import '@testing-library/jest-dom';

window.ResizeObserver = class {
  observe() {}
  disconnect() {}
  unobserve() {}
};
