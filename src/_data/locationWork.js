/* Real projects matched to location landing pages.
   Where we have actually surfaced a driveway in a town that has a landing page, that
   page shows the photos. It is the one thing on these pages that is genuinely local
   and can't be templated — which is what keeps 24 near-identical town pages from
   reading as doorway content.

   Keyed by location slug, in two sets:
     all   -> every surface (the /driveways-{slug}/ pages)
     resin -> resin only    (the /resin-driveways-{slug}/ pages, where a tarmac job
                             would be off-message)

   Matching is on the project's `place` against the town name, so adding a project in
   services.js with place: "Holt" lights up the Holt page by itself. */

const services = require("./services.js");
const locations = require("./locations.js");

const MAX_PHOTOS = 4;
const norm = s => String(s || "").toLowerCase().replace(/^the /, "").replace(/[^a-z]/g, "");

/* every project, flattened, with its surface attached */
const projects = [];
services.forEach(svc => (svc.work || []).forEach(w => {
  const photos = (w.images || []).slice();
  const cover = w.imgFull || w.img;
  if (cover && photos.indexOf(cover) === -1) photos.unshift(cover);
  if (!photos.length) return;                       // nothing to show, skip it
  projects.push({
    slug: svc.slug, surface: svc.navLabel || svc.slug,
    title: w.title, place: w.place, photos
  });
}));

function matchFor(town, onlyResin) {
  const hits = projects.filter(p =>
    norm(p.place) === norm(town) && (!onlyResin || p.slug === "resin"));
  if (!hits.length) return null;

  /* Deal photos out one project at a time so a town with two jobs shows both,
     rather than four shots of the same driveway. */
  const photos = [];
  for (let i = 0; photos.length < MAX_PHOTOS; i++) {
    const before = photos.length;
    hits.forEach(p => { if (p.photos[i] && photos.length < MAX_PHOTOS)
      photos.push({ src: p.photos[i], alt: `${p.title}, ${p.place} — ${p.surface}` }); });
    if (photos.length === before) break;             // all projects exhausted
  }

  return {
    photos,
    projects: hits.map(p => ({ slug: p.slug, surface: p.surface, title: p.title })),
    surfaces: [...new Set(hits.map(p => p.surface))],
    count: hits.length
  };
}

const all = {}, resin = {};
locations.driveways.forEach(l => { const m = matchFor(l.name, false); if (m) all[l.slug] = m; });
locations.resinDriveways.forEach(l => { const m = matchFor(l.name, true); if (m) resin[l.slug] = m; });

module.exports = { all, resin };
