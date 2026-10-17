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
  { slug: "tarmac",       label: "Tarmac",      cat: "tarmac" },
  { slug: "gravel",       label: "Gravel",      cat: "gravel" }
];

function projectsFor({ slug, label, cat }) {
  const svc = services.find(s => s.slug === slug);
  return (svc && svc.work ? svc.work : [])
    .map(w => {
      // the cover shot isn't always inside `images` — keep it, first
      const imgs = (w.images || []).slice();
      const cover = w.imgFull || w.img;          // tiles may use a cropped copy
      if (cover && imgs.indexOf(cover) === -1) imgs.unshift(cover);
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

/* Block paving has no photographed project set yet, so it comes from the general folder
   and sits at the end until there is one to slot into the rotation above. */
ordered.push({
  surface: "Block paving", cat: "block", place: "St Faiths", title: "Block paved driveway",
  images: [
    "/assets/images/block-paving/projects/st-faiths/st-faiths-block-paving-driveway-finished.webp",
    "/assets/images/general-gallery/block-paving-wide.webp",
    "/assets/images/general-gallery/block-paving-front-view.webp"
  ]
});

module.exports = ordered;
