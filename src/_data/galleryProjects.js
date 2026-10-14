/* Gallery running order.
   The gallery is built from the same project data as the service pages, so adding photos
   to a project in services.js puts them on the gallery too — no second list to keep in step.

   Order rotates through the surfaces a project at a time: tar & chip, resin, tarmac, and
   round again. Whatever is left over (resin has the most projects) follows, then the
   surfaces we don't yet have project photo sets for. */

const services = require("./services.js");

const SURFACES = [
  { slug: "tar-and-chip", label: "Tar & chip",  cat: "tarchip" },
  { slug: "resin",        label: "Resin bound", cat: "resin" },
  { slug: "tarmac",       label: "Tarmac",      cat: "tarmac" }
];

function projectsFor({ slug, label, cat }) {
  const svc = services.find(s => s.slug === slug);
  return (svc && svc.work ? svc.work : [])
    .map(w => {
      // the cover shot isn't always inside `images` — keep it, first
      const imgs = (w.images || []).slice();
      if (w.img && imgs.indexOf(w.img) === -1) imgs.unshift(w.img);
      return { surface: label, cat, place: w.place, title: w.title, images: imgs };
    })
    .filter(p => p.images.length);
}

/* deal the projects out one surface at a time until they're all placed */
const decks = SURFACES.map(projectsFor);
const ordered = [];
for (let i = 0; i < Math.max(...decks.map(d => d.length)); i++) {
  decks.forEach(deck => { if (deck[i]) ordered.push(deck[i]); });
}

/* Surfaces without a photographed project yet — these come from the general folders and
   sit at the end until there are proper project sets to slot into the rotation above. */
const G = "/assets/images/gravel/projects/";
ordered.push({
  surface: "Gravel", cat: "gravel", place: "Norfolk", title: "Gravel driveways",
  images: [
    G + "bungalow-golden/bungalow-golden-gravel-driveway-finished.webp",
    G + "gravel-driveway/gravel-driveway-finished.webp",
    G + "norwich-modern/norwich-modern-gravel-driveway.webp",
    "/assets/images/general-gallery/gravel-drive.webp"
  ]
});
ordered.push({
  surface: "Block paving", cat: "block", place: "St Faiths", title: "Block paved driveway",
  images: [
    "/assets/images/block-paving/projects/st-faiths/st-faiths-block-paving-driveway-finished.webp",
    "/assets/images/general-gallery/block-paving-wide.webp",
    "/assets/images/general-gallery/block-paving-front-view.webp"
  ]
});

module.exports = ordered;
