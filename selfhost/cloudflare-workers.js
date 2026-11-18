// Stand-in for Cloudflare's worker runtime, which Base44's error reporting imports.
// The self-hosted static build has no worker, so these are no-ops.
export const env = {};
export const waitUntil = (promise) => {
  Promise.resolve(promise).catch(() => {});
};