// Polyfill for node:module in browser environment
export default {};
export const createRequire = () => {
  return () => ({});
};
