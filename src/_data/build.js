// New value every build → used to cache-bust CSS/JS URLs so the browser never
// serves a stale asset after a change.
module.exports = { time: Date.now() };
