import "@testing-library/jest-dom";

/* jsdom stubs — GitHub calendar and gallery scroll rely on browser APIs */
window.scrollTo = () => {};

globalThis.IntersectionObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  readonly root: Element | null = null;
  readonly rootMargin = "";
  readonly thresholds: readonly number[] = [];
} as unknown as typeof IntersectionObserver;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const g = globalThis as any;
if (typeof g.CSS === "undefined") {
  g.CSS = { supports: () => true };
} else if (typeof g.CSS.supports !== "function") {
  g.CSS.supports = () => true;
}

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});
