/*
  One object per surface. The service.njk layout renders a full page from this.
  - h1Lead / h1Em  : headline split so the last word renders as the grey serif accent
  - work[]         : gallery tiles  (blend = a .resin texture class; wide = full-width tile)
  - why.points[]   : { title, sub }
  - build.steps[]  : { tag, title, body, layers:[...layer classes bottom→top] }
  - finishes.items : [ blendClass, name, note ]
  Shared "About" copy lives in the layout; override here with `about` if needed.
*/

const ABOUT = "Setting the standard across Norfolk. We pair decades of inherited, hands-on site expertise with strict engineering standards — and we don't subcontract, cut corners on the sub-base, or disappear after handover.";

module.exports = [
  {
    slug: "resin",
    hideHeroLede: true,   // kept for the page description; the hero reads cleaner without it
    order: 1,
    name: "Resin bound",
    navLabel: "Resin bound",
    title: "Resin bound surfacing — Norfolk's resin specialists",
    eyebrow: "Resin bound surfacing",
    h1Lead: "Norfolk's resin",
    h1Em: "specialists.",
    h1Html: "Norfolk's<br>resin<br><em>specialists.</em>",
    heroLede: "Resin bound driveways laid in-house across Norfolk — permeable, seamless and available in over fifty colours, on a base built to take them.",
    workHead: "Recent work",
    work: [
      { img: "/assets/images/resin/projects/wells-silver-grey/wells-silver-grey-resin-driveway-closeup.webp", title: "Silver Grey driveway", place: "Wells", images: [
        "/assets/images/resin/projects/wells-silver-grey/wells-silver-grey-resin-driveway-finished.webp",
        "/assets/images/resin/projects/wells-silver-grey/wells-silver-grey-resin-driveway-closeup.webp",
        "/assets/images/resin/projects/wells-silver-grey/wells-silver-grey-resin-driveway-angle-1.webp",
        "/assets/images/resin/projects/wells-silver-grey/wells-silver-grey-resin-driveway-angle-4.webp"
      ] },
      { img: "/assets/images/resin/projects/sheringham-golden-path/sheringham-golden-path-resin-driveway-angle.webp", title: "Golden Harvest path", place: "Sheringham", portrait: true, images: [
        "/assets/images/resin/projects/sheringham-golden-path/sheringham-golden-path-resin-driveway-finished.webp",
        "/assets/images/resin/projects/sheringham-golden-path/sheringham-golden-path-resin-driveway-angle.webp"
      ] },
      { img: "/assets/images/resin/projects/buxton-resin-driveway/buxton-resin-driveway-closeup.webp", title: "Large resin driveway", place: "Buxton", images: [
        "/assets/images/resin/projects/buxton-resin-driveway/buxton-resin-driveway-progress-1.webp",
        "/assets/images/resin/projects/buxton-resin-driveway/buxton-resin-driveway-detail-1.webp",
        "/assets/images/resin/projects/buxton-resin-driveway/buxton-resin-driveway-progress-2.webp",
        "/assets/images/resin/projects/buxton-resin-driveway/buxton-resin-driveway-full-view.webp"
      ] },
      { img: "/assets/images/resin/projects/wymondham-shadow-blue/wymondham-shadow-blue-resin-driveway-closeup-tile.webp", imgFull: "/assets/images/resin/projects/wymondham-shadow-blue/wymondham-shadow-blue-resin-driveway-closeup.webp", title: "Shadow Blue driveway & path", place: "Wymondham", pos: "38% 50%", images: [
        "/assets/images/resin/projects/wymondham-shadow-blue/wymondham-shadow-blue-resin-driveway-excavation.webp",
        "/assets/images/resin/projects/wymondham-shadow-blue/wymondham-shadow-blue-resin-driveway-type1-subbase.webp",
        "/assets/images/resin/projects/wymondham-shadow-blue/wymondham-shadow-blue-resin-driveway-tarmac-base-laid.webp",
        "/assets/images/resin/projects/wymondham-shadow-blue/wymondham-shadow-blue-resin-driveway-path-being-laid.webp",
        "/assets/images/resin/projects/wymondham-shadow-blue/wymondham-shadow-blue-resin-driveway-resin-being-laid.webp",
        "/assets/images/resin/projects/wymondham-shadow-blue/wymondham-shadow-blue-resin-driveway-resin-being-laid-2.webp",
        "/assets/images/resin/projects/wymondham-shadow-blue/wymondham-shadow-blue-resin-driveway-path-finished.webp",
        "/assets/images/resin/projects/wymondham-shadow-blue/wymondham-shadow-blue-resin-driveway-finished-front-on.webp",
        "/assets/images/resin/projects/wymondham-shadow-blue/wymondham-shadow-blue-resin-driveway-finished.webp",
        "/assets/images/resin/projects/wymondham-shadow-blue/wymondham-shadow-blue-resin-driveway-closeup.webp"
      ] },
      { img: "/assets/images/resin/projects/thorpe-marriott/thorpe-marriott-resin-driveway-closeup-front.webp", title: "Resin driveway", place: "Thorpe Marriott", images: [
        "/assets/images/resin/projects/thorpe-marriott/thorpe-marriott-resin-driveway-closeup-front.webp",
        "/assets/images/resin/projects/thorpe-marriott/thorpe-marriott-resin-driveway-edging-blocks-laid.webp",
        "/assets/images/resin/projects/thorpe-marriott/thorpe-marriott-resin-driveway-tarmac-base-ready.webp",
        "/assets/images/resin/projects/thorpe-marriott/thorpe-marriott-resin-driveway-resin-being-laid.webp",
        "/assets/images/resin/projects/thorpe-marriott/thorpe-marriott-resin-driveway-full-view.webp",
        "/assets/images/resin/projects/thorpe-marriott/thorpe-marriott-resin-driveway-closeup-full-view.webp"
      ] },
      { galleryOnly: true, img: "/assets/images/resin/projects/sandringham-case-study/sandringham-resin-driveway-closeup-finished.webp", title: "Resin driveway", place: "Sandringham", images: [
        "/assets/images/resin/projects/sandringham-case-study/sandringham-resin-driveway-type1-subbase-delivery.webp",
        "/assets/images/resin/projects/sandringham-case-study/sandringham-resin-driveway-before-start.webp",
        "/assets/images/resin/projects/sandringham-case-study/sandringham-resin-driveway-tarmac-base-laid.webp",
        "/assets/images/resin/projects/sandringham-case-study/sandringham-resin-driveway-closeup-finished.webp"
      ] },
      { img: "/assets/images/resin/projects/reedham/reedham-tarmac-closeup.webp", title: "Resin driveway", place: "Reedham", images: [
        "/assets/images/resin/projects/reedham/reedham-before.webp",
        "/assets/images/resin/projects/reedham/reedham-type1-half.webp",
        "/assets/images/resin/projects/reedham/reedham-type1-full.webp",
        "/assets/images/resin/projects/reedham/reedham-tarmac-wide.webp",
        "/assets/images/resin/projects/reedham/reedham-tarmac-closeup.webp",
        "/assets/images/resin/projects/reedham/reedham-resin-third.webp",
        "/assets/images/resin/projects/reedham/reedham-resin-two-thirds.webp",
        "/assets/images/resin/projects/reedham/reedham-finished.webp",
        "/assets/images/resin/projects/reedham/reedham-other-side.webp"
      ] }
    ],
    why: {
      heading: "Looks new.", em: "Stays new.",
      lede: "A premium surface for a reason. No weeds, no puddles, no resurfacing — just a clean finish that holds its colour.",
      points: [
        { icon: "drain",   title: "Water drains through", sub: "No standing water, ever" },
        { icon: "spark",   title: "Zero maintenance", sub: "A sweep and the odd rinse" },
        { icon: "sun",     title: "UV stable — won't yellow", sub: "The binder holds true colour" },
        { icon: "flex",    title: "Flexible — doesn't crack", sub: "Moves with the ground beneath" },
        { icon: "palette", title: "50+ colours", sub: "Standard blends or bespoke" }
      ]
    },
    build: {
      heading: "Engineered to", em: "last.",
      lede: "A resin drive is only as good as what's underneath it. Here's the full build — bottom to top.",
      steps: [
        { tag: "Excavate", title: "Dig out to 220mm", body: "We excavate down to 220mm and cart every bit of spoil away through a licensed waste carrier — often our own vehicles." },
        { tag: "Compact", title: "Level & compact the base", body: "The formation is graded level and thoroughly compacted to give everything above it a firm, stable footing." },
        { tag: "Membrane", title: "Weed-control membrane", body: "A membrane is rolled across the base — it stops weeds pushing through and keeps the soil from working up into the sub-base over time." },
        { tag: "Sub-base", title: "150mm compacted gravel", body: "A 150mm layer of gravel is spread, then rolled and compacted with commercial-grade rollers into a solid, load-bearing sub-base." },
        { tag: "Base course", title: "50mm permeable tarmac", body: "A 50mm permeable, porous tarmac base goes down over the sub-base — laid true and level, and free-draining so water passes straight through." },
        { tag: "Finish", title: "Resin, expertly laid", body: "Finally our resin specialists lay the surface and work it to the best possible finish." }
      ]
    },
    finishes: {
      kicker: "Finishes", heading: "Find your", em: "finish.",
      lede: "Six of our clients' favourites below — over fifty more in the book. Tap one to see it.",
      more: "",
      items: [
        ["gold",   "Ivory Coastal",   "6mm", "/assets/images/resin/resin-bound-ivory-coastal-aggregate.webp"],
        ["silver", "Slate Blue Grey",  "6mm", "/assets/images/resin/resin-bound-slate-blue-grey-aggregate.webp"],
        ["bracken","Copper Multi",     "6mm", "/assets/images/resin/resin-bound-copper-multi-aggregate.webp"],
        ["oyster", "Toffee Earth",     "6mm", "/assets/images/resin/resin-bound-toffee-earth-aggregate.webp"],
        ["forest", "Ash Contrast",     "6mm", "/assets/images/resin/resin-bound-ash-contrast-aggregate.webp"],
        ["pewter", "Golden Harvest",   "6mm", "/assets/images/resin/resin-bound-golden-harvest-aggregate.webp"],
        ["silvr",  "Silver Grey",      "6mm", "/assets/images/resin/resin-bound-silver-grey-aggregate.webp"],
        ["tarmac", "Onyx Black",       "6mm", "/assets/images/resin/resin-bound-onyx-black-aggregate.webp"]
      ]
    },
    faqs: [
      { q: "Will the colour fade over time?", a: "No. We only use UV-stable resin, and our suppliers back it with a 15-year no-fade guarantee — so the colour you choose is the colour it stays." },
      { q: "Does water drain through it?", a: "Yes. Resin bound is fully permeable, and the base we build underneath is permeable too, so rainwater drains straight through instead of pooling. A permeable sub-base matters — it means water never gets trapped beneath the surface." },
      { q: "How long does a resin driveway last?", a: "A properly installed resin drive will look and perform well for 15–20 years or more. The binder flexes with the ground rather than cracking or potholing like tarmac can." },
      { q: "When can I walk and drive on it?", a: "You can usually walk on it the same evening and park on it after around 24–48 hours, once the resin has fully cured. We'll confirm exact timings on the day based on the weather." },
      { q: "Can you lay resin over my existing driveway?", a: "Sometimes. If the existing tarmac or concrete is sound and drains well, we can overlay it. If it isn't, we'll build a proper permeable base first — we'll tell you honestly which applies at the site visit." },
      { q: "Is it slippery when wet?", a: "No. The natural aggregate gives a grippy, textured finish, and because water drains straight through there's no film of standing water sitting on top to slip on." },
      { q: "How do I look after it?", a: "Very little upkeep — an occasional rinse or gentle power-wash, and keeping leaves and moss from building up, is all it takes to keep it looking freshly laid." }
    ]
  },

  {
    slug: "tarmac",
    hideHeroLede: true,   // kept for the page description; the hero reads cleaner without it
    order: 3,
    name: "Tarmac",
    navLabel: "Tarmac",
    title: "Precision Surfacing — Norfolk tarmac & surfacing contractors",
    eyebrow: "Tarmacadam surfacing",
    h1Lead: "Norfolk's tarmac",
    h1Em: "specialists.",
    h1Html: "Norfolk's<br>tarmac<br><em>experts.</em>",
    heroLede: "Driveways, car parks, farm yards and access roads — laid hot, rolled hard and engineered to carry real weight for years.",
    workHead: "Recent work",
    work: [
      { img: "/assets/images/tarmac/projects/sheringham-grey/sheringham-grey-tarmac-driveway-finished.webp", title: "Silver-grey driveway", place: "Sheringham", images: [
        "/assets/images/tarmac/projects/sheringham-grey/sheringham-grey-tarmac-driveway-finished.webp",
        "/assets/images/tarmac/projects/sheringham-grey/sheringham-grey-tarmac-driveway-angle.webp",
        "/assets/images/tarmac/projects/sheringham-grey/sheringham-grey-tarmac-driveway-before.webp",
        "/assets/images/tarmac/projects/sheringham-grey/sheringham-grey-tarmac-driveway-subbase.webp",
        "/assets/images/tarmac/projects/sheringham-grey/sheringham-grey-tarmac-driveway-progress.webp"
      ] },
      { img: "/assets/images/tarmac/projects/north-walsham/north-walsham-tarmac-driveway-finished.webp", title: "Front driveway", place: "North Walsham", images: [
        "/assets/images/tarmac/projects/north-walsham/north-walsham-tarmac-driveway-closeup-front.webp",
        "/assets/images/tarmac/projects/north-walsham/north-walsham-tarmac-driveway-finished.webp",
        "/assets/images/tarmac/projects/north-walsham/north-walsham-tarmac-driveway-side-view.webp"
      ] },
      { img: "/assets/images/tarmac/projects/tarmac%20driveway%20easton/easton-tarmac-driveway-closeup-front.webp", title: "Sweeping driveway", place: "Easton", images: [
        "/assets/images/tarmac/projects/tarmac%20driveway%20easton/easton-tarmac-driveway-closeup-front.webp",
        "/assets/images/tarmac/projects/tarmac%20driveway%20easton/easton-tarmac-driveway-before-2.webp",
        "/assets/images/tarmac/projects/tarmac%20driveway%20easton/easton-tarmac-driveway-finished-1.webp"
      ] }
    ],
    why: {
      heading: "Hard-wearing.", em: "Hard-working.",
      lede: "The workhorse surface. Lays fast, takes weight, costs less per square metre — and when it's built properly underneath, it just keeps going.",
      points: [
        { icon: "weight",   title: "Takes heavy loads", sub: "HGVs, plant, daily traffic" },
        { icon: "roller",   title: "Laid hot & rolled tight", sub: "A true, dead-level finish" },
        { icon: "seamless", title: "Seamless — no joints", sub: "Nothing for weeds to find" },
        { icon: "clock",    title: "Laid in a day", sub: "Down, rolled and usable fast" },
        { icon: "value",    title: "Best value per m²", sub: "Big areas without big costs" }
      ]
    },
    build: {
      heading: "Strength is in the", em: "base.",
      lede: "Anyone can lay a skim of tarmac. It lasts because of what goes under it — and how hard it's compacted.",
      steps: [
        { tag: "Excavate", title: "Dig out to 220mm", body: "We excavate down to 220mm and cart every bit of spoil away through a licensed waste carrier — often our own vehicles." },
        { tag: "Compact", title: "Level & compact the base", body: "The formation is graded level and thoroughly compacted to give everything above it a firm, stable footing." },
        { tag: "Membrane", title: "Weed-control membrane", body: "A membrane is rolled across the base — it stops weeds pushing through and keeps the soil from working up into the sub-base over time." },
        { tag: "Sub-base", title: "150mm compacted gravel", body: "A 150mm layer of gravel is spread, then rolled and compacted with commercial-grade rollers into a solid, load-bearing sub-base." },
        { tag: "Surface", title: "50mm asphalt", body: "A 50mm layer of asphalt is laid hot over the sub-base and rolled tight to a true, level, sealed finish." }
      ]
    },
    finishes: {
      kicker: "Chippings", heading: "Dressed in", em: "stone.",
      lede: "Decorative chippings rolled into the hot surface. Tap one to see it.",
      more: "",
      items: [
        ["honey", "Golden Buff",     "warm",    "/assets/images/tarmac/chippings/tarmac-buff-chippings-closeup.webp"],
        ["pewter","Silver Grey",     "cool",    "/assets/images/tarmac/chippings/tarmac-grey-chippings-closeup.webp"],
        ["redtar","Red Granite",     "feature", "/assets/images/tarmac/chippings/tarmac-red-chippings-closeup.webp"],
        ["gravel","Natural Shingle", "coastal", "/assets/images/tarmac/chippings/tarmac-shingle-chippings-surface.webp"]
      ]
    },
    faqs: [
      { q: "How long does a tarmac driveway last?", a: "A well-laid tarmac drive lasts 15–20 years or more. Laid hot and rolled tight over a deep, compacted sub-base, it shrugs off heavy, everyday use without rutting." },
      { q: "How soon can I drive on it?", a: "You can usually walk on it the same day and drive on it after about 2–3 days, once it has fully cooled and hardened. We'll confirm timings on the day." },
      { q: "Can you lay tarmac over my existing driveway?", a: "Often, yes. If the existing surface is sound we can overlay it; if it's cracked or moving we'll dig out and rebuild the base first. We'll be straight with you at the site visit." },
      { q: "Why does tarmac crack, and will mine?", a: "Cracking almost always comes from a weak base, not the tarmac itself. We compact a deep Type 1 sub-base so the surface sits on a stable foundation and moves as one — which is what prevents it." },
      { q: "Can I have colour or chippings on it?", a: "Yes — we can dress the hot surface with decorative stone chippings for extra grip and a lift on a plain black drive, in a range of colours." },
      { q: "How do I look after it?", a: "Very little upkeep — keep the edges clear of weeds and standing water, and an occasional reseal every few years keeps it looking its best." }
    ]
  },

  {
    slug: "block-paving",
    comingSoon: true,
    order: 4,
    name: "Block paving",
    navLabel: "Block paving",
    title: "Block paving — Precision Surfacing, Norfolk",
    eyebrow: "Block paving",
    h1Lead: "Laid to a",
    h1Em: "pattern.",
    workHead: "Recent work",
    work: [
      { blend: "tarmac", title: "Block paved driveway", place: "Norwich", wide: true },
      { blend: "pewter", title: "Front path & steps",   place: "Wymondham" },
      { blend: "oyster", title: "Courtyard",            place: "Wroxham" }
    ],
    why: {
      heading: "Hard-wearing.", em: "Timeless.",
      lede: "A classic, repairable surface in countless colours and laying patterns — lift and relay a single block, no patch in sight.",
      points: [
        { icon: "repair", title: "Individually repairable", sub: "Lift and relay a single block" },
        { icon: "grid",   title: "Huge range of styles", sub: "Colours, sizes, laying patterns" },
        { icon: "shield", title: "Strong & load-bearing", sub: "Properly bedded and edged" },
        { icon: "edges",  title: "Defined edges", sub: "Crisp borders and detailing" },
        { icon: "home",   title: "Adds kerb appeal", sub: "A real lift to the frontage" }
      ]
    },
    build: {
      heading: "Bedded to", em: "stay.",
      lede: "The blocks are the easy part. Longevity comes from the base, the bedding and the edge restraints.",
      steps: [
        { tag: "Excavate", title: "Dig out & set the falls", body: "Strip back to formation and grade the falls for drainage.", layers: ["l-earth"] },
        { tag: "Sub-base", title: "Compacted MOT Type 1", body: "A deep, compacted stone sub-base for a stable foundation.", layers: ["l-base-sub","l-earth"] },
        { tag: "Edgings", title: "Haunched edge restraints", body: "Concrete-haunched edgings lock the blocks in so nothing creeps.", layers: ["l-base-tar","l-base-sub","l-earth"] },
        { tag: "Lay", title: "Blocks bedded & jointed", body: "Laid on screeded sand to the chosen pattern, then jointed and compacted.", layers: ["l-resin resin pewter","l-primer","l-base-tar","l-base-sub","l-earth"] }
      ]
    },
    finishes: {
      kicker: "Styles", heading: "Pick a", em: "pattern.",
      lede: "A handful of popular blocks and colours — many more in the brochure. Tap one to see it.",
      more: "+ herringbone, stretcher & basketweave patterns",
      items: [
        ["pewter","Charcoal","60mm"], ["oyster","Natural","60mm"], ["bracken","Brindle","60mm"],
        ["silver","Silver Grey","60mm"], ["buff","Buff","60mm"], ["gold","Sandstone","60mm"]
      ]
    },
    faqs: [
      { q: "How long does block paving last?", a: "Properly laid and edged, block paving lasts 20 years or more. And because it's individual blocks, any that are damaged can be lifted and replaced without redoing the whole drive." },
      { q: "Will weeds grow between the blocks?", a: "We finish with a jointing sand that resists weeds, and the tight, compacted joints leave little room for growth. An occasional top-up keeps it that way." },
      { q: "Can you repair a sunken or dipped area?", a: "Yes — that's one of the big advantages of block paving. We lift the affected blocks, correct the base beneath and relay them, so there's no visible patch." },
      { q: "What patterns and colours can I choose?", a: "Herringbone, stretcher bond, basketweave and more, in a wide range of colours and block sizes. We'll help you pick something that suits the house." },
      { q: "Does it need a strong base?", a: "Yes — that's where paving jobs are won or lost. We build a deep, compacted sub-base with concrete-haunched edge restraints so nothing shifts or spreads over time." },
      { q: "How do I maintain it?", a: "A sweep, the odd wash, and topping up the jointing sand now and then. It's a low-maintenance surface." }
    ]
  },

  {
    slug: "tar-and-chip",
    hideHeroLede: true,   // kept for the page description; the hero reads cleaner without it
    hideFinishes: true,
    order: 2,
    name: "Tar & chip",
    navLabel: "Tar & chip",
    title: "Tar & chip surfacing — Precision Surfacing, Norfolk",
    eyebrow: "Tar & chip surfacing",
    h1Html: "<em>Tar &amp; chip</em><br>across<br>Norfolk.",
    heroLede: "Decorative stone chippings rolled hard into hot binder — a rugged, grippy, natural finish that's right at home on driveways, courtyards and country lanes.",
    workHead: "Recent work",
    work: [
      { img: "/assets/images/tar-and-chip/projects/the-old-hall/the-old-hall-tar-and-chip-driveway-finished.webp", title: "Sweeping country drive", place: "The Old Hall", images: [
        "/assets/images/tar-and-chip/projects/the-old-hall/the-old-hall-tar-and-chip-driveway-before-start.webp",
        "/assets/images/tar-and-chip/projects/the-old-hall/the-old-hall-tar-and-chip-driveway-steel-edging-installation.webp",
        "/assets/images/tar-and-chip/projects/the-old-hall/the-old-hall-tar-and-chip-driveway-steel-edging-in.webp",
        "/assets/images/tar-and-chip/projects/the-old-hall/the-old-hall-tar-and-chip-driveway-base-prepared.webp",
        "/assets/images/tar-and-chip/projects/the-old-hall/the-old-hall-tar-and-chip-driveway-binder-sprayed.webp",
        "/assets/images/tar-and-chip/projects/the-old-hall/the-old-hall-tar-and-chip-driveway-chip-spread-and-rolled.webp",
        "/assets/images/tar-and-chip/projects/the-old-hall/the-old-hall-tar-and-chip-driveway-binder-and-chip-phone-box.webp",
        "/assets/images/tar-and-chip/projects/the-old-hall/the-old-hall-tar-and-chip-driveway-closeup.webp",
        "/assets/images/tar-and-chip/projects/the-old-hall/the-old-hall-tar-and-chip-driveway-driveway-curve.webp",
        "/assets/images/tar-and-chip/projects/the-old-hall/the-old-hall-tar-and-chip-driveway-junction.webp",
        "/assets/images/tar-and-chip/projects/the-old-hall/the-old-hall-tar-and-chip-driveway-phone-box-finished.webp",
        "/assets/images/tar-and-chip/projects/the-old-hall/the-old-hall-tar-and-chip-driveway-house-entrance.webp",
        "/assets/images/tar-and-chip/projects/the-old-hall/the-old-hall-tar-and-chip-driveway-finished.webp"
      ] },
      { img: "/assets/images/tar-and-chip/projects/north-walsham/north-walsham-tar-and-chip-driveway-closeup-hero.webp", title: "New-build driveway", place: "North Walsham", images: [
        "/assets/images/tar-and-chip/projects/north-walsham/north-walsham-tar-and-chip-driveway-binder-poured.webp",
        "/assets/images/tar-and-chip/projects/north-walsham/north-walsham-tar-and-chip-driveway-binder-sprayed.webp",
        "/assets/images/tar-and-chip/projects/north-walsham/north-walsham-tar-and-chip-driveway-chip-being-spread.webp",
        "/assets/images/tar-and-chip/projects/north-walsham/north-walsham-tar-and-chip-driveway-wide-view.webp",
        "/assets/images/tar-and-chip/projects/north-walsham/north-walsham-tar-and-chip-driveway-wide-view-other-side.webp",
        "/assets/images/tar-and-chip/projects/north-walsham/north-walsham-tar-and-chip-driveway-finished.webp",
        "/assets/images/tar-and-chip/projects/north-walsham/north-walsham-tar-and-chip-driveway-closeup-hero.webp"
      ] },
      { img: "/assets/images/tar-and-chip/projects/foulsham/foulsham-tar-and-chip-driveway-photo-01.webp", title: "Farmhouse courtyard", place: "Foulsham", images: [
        "/assets/images/tar-and-chip/projects/foulsham/foulsham-tar-and-chip-driveway-photo-02.webp",
        "/assets/images/tar-and-chip/projects/foulsham/foulsham-tar-and-chip-driveway-photo-01.webp"
      ] }
    ],
    why: {
      heading: "Rustic.", em: "Robust.",
      lede: "A sprayed-bitumen, stone-dressed surface with a natural, gravelled look — hard-wearing, high-grip and right at home on rural drives.",
      points: [
        { icon: "stone",   title: "Natural, gravelled look", sub: "Without loose stone underfoot" },
        { icon: "grip",    title: "High grip", sub: "Sure-footed on slopes" },
        { icon: "value",   title: "Great value over big areas", sub: "Long drives and lanes" },
        { icon: "shield",  title: "Hard-wearing", sub: "Built for rural traffic" },
        { icon: "palette", title: "Range of chip colours", sub: "Granite, flint and buff" }
      ]
    },
    build: {
      heading: "Sprayed &", em: "dressed.",
      lede: "A sound base, hot bitumen and the right chip — rolled in tight for a surface that holds together.",
      steps: [
        { tag: "Prepare", title: "Grade & firm the base", body: "We level and consolidate the existing base ready to dress.", layers: ["l-earth"] },
        { tag: "Sub-base", title: "Compacted stone where needed", body: "Weak areas are dug out and rebuilt with compacted Type 1.", layers: ["l-base-sub","l-earth"] },
        { tag: "Spray", title: "Hot bitumen binder", body: "A hot bitumen binder is sprayed evenly across the prepared base.", layers: ["l-base-tar","l-base-sub","l-earth"] },
        { tag: "Chip", title: "Stone dressed & rolled", body: "Stone chippings are spread over the binder and rolled in tight.", layers: ["l-resin resin tarchip","l-primer","l-base-tar","l-base-sub","l-earth"] }
      ]
    },
    finishes: {
      kicker: "Chippings", heading: "Choose your", em: "chip.",
      lede: "The chip sets the colour and character. A few favourites below.",
      more: "+ bespoke blends available",
      items: [
        ["bracken","Golden Flint","14mm"], ["pewter","Grey Granite","14mm"], ["redtar","Red Granite","14mm"],
        ["buff","Cotswold","14mm"], ["gravel","Natural","14mm"], ["forest","Moorland","14mm"]
      ]
    },
    faqs: [
      { q: "What exactly is tar and chip?", a: "Also called surface dressing, it's a layer of hot bitumen binder with stone chippings rolled into it — giving a natural, gravelled look without the loose stone underfoot." },
      { q: "How long does it last?", a: "A tar and chip surface typically lasts 10–15 years. It's hard-wearing and well suited to rural drives, longer lanes and access roads." },
      { q: "Is it cheaper than tarmac or resin?", a: "Usually, yes — especially over larger areas. It's a cost-effective way to surface a long driveway or access road with plenty of character." },
      { q: "Will loose stone come up?", a: "A little surplus chip can lift in the first few weeks as it settles, which sweeps up easily. Once bedded into the binder, the stone stays locked in place." },
      { q: "What chip colours are available?", a: "A good range — granite, flint and buff among them — so you can match the finish to your property and its surroundings." },
      { q: "Is it suitable for a sloped drive?", a: "Yes. The textured surface gives excellent grip, which makes tar and chip a strong choice for sloped drives and rural access." }
    ]
  },

  {
    slug: "gravel",
    buildImage: "/assets/images/gravel/projects/norwich-block-edged/norwich-block-edged-gravel-driveway-base-prepared.webp",
    buildImageAlt: "Compacted Type 1 blinded with granite dust, ready for stone",
    hideFinishes: true,   // no colour picker on this page yet
    hideHeroLede: true,
    order: 5,
    name: "Gravel",
    navLabel: "Gravel",
    title: "Gravel & shingle driveways — Precision Surfacing, Norfolk",
    eyebrow: "Gravel & shingle",
    h1Html: "Norfolk's<br>gravel<br><em>driveways.</em>",
    heroLede: "Gravel and shingle driveways laid across Norfolk — excavated, membraned, built on compacted Type 1 and blinded with granite dust before the stone goes down.",
    workHead: "Recent work",
    work: [
      { img: "/assets/images/gravel/projects/easton/easton-tar-and-chip-driveway-1.webp", title: "Cottage driveway", place: "Easton", images: [
        "/assets/images/gravel/projects/easton/easton-tar-and-chip-driveway-1.webp",
        "/assets/images/gravel/projects/easton/easton-tar-and-chip-driveway-2.webp",
        "/assets/images/gravel/projects/easton/easton-tar-and-chip-driveway-3.webp"
      ] },
      { img: "/assets/images/gravel/projects/norwich-block-edged/norwich-block-edged-gravel-driveway-other-side.webp", title: "Block-edged gravel driveway", place: "Norwich", images: [
        "/assets/images/gravel/projects/norwich-block-edged/norwich-block-edged-gravel-driveway-base-prepared.webp",
        "/assets/images/gravel/projects/norwich-block-edged/norwich-block-edged-gravel-driveway-front-view.webp",
        "/assets/images/gravel/projects/norwich-block-edged/norwich-block-edged-gravel-driveway-other-side.webp",
        "/assets/images/gravel/projects/norwich-block-edged/norwich-block-edged-gravel-driveway-finished.webp"
      ] },
      { img: "/assets/images/gravel/projects/bungalow-golden/bungalow-golden-gravel-driveway-finished.webp", title: "Golden gravel driveway", place: "Norfolk", images: [
        "/assets/images/gravel/projects/bungalow-golden/bungalow-golden-gravel-driveway-before.webp",
        "/assets/images/gravel/projects/bungalow-golden/bungalow-golden-gravel-driveway-subbase.webp",
        "/assets/images/gravel/projects/bungalow-golden/bungalow-golden-gravel-driveway-subbase-detail.webp",
        "/assets/images/gravel/projects/bungalow-golden/bungalow-golden-gravel-driveway-finished.webp"
      ] }
    ],
    why: {
      heading: "Affordable.", em: "Adaptable.",
      lede: "Done properly — membrane, compacted Type 1 and a granite dust blinding beneath — gravel stays put, drains freely and looks the part for years.",
      points: [
        { icon: "grid",    title: "Built on a proper base", sub: "Membrane, Type 1 and granite dust" },
        { icon: "drain",   title: "Free-draining", sub: "Water soaks straight through" },
        { icon: "value",   title: "Cost-effective", sub: "Great value over large areas" },
        { icon: "lock",    title: "Natural security", sub: "The crunch underfoot" },
        { icon: "palette", title: "Wide colour range", sub: "Golds, greys and naturals" }
      ]
    },
    build: {
      heading: "Built to", em: "stay put.",
      lede: "Loose gravel tipped onto soil ruts and migrates. Built up in layers over a proper base, it stays where it's laid and drains freely.",
      steps: [
        { tag: "Excavate", title: "Dig out & set the falls", body: "Strip back to formation and grade so water runs where it should.", layers: ["l-earth"] },
        { tag: "Membrane", title: "Weed membrane laid", body: "A geotextile membrane separates the ground from the stone above and keeps weeds down.", layers: ["l-primer","l-earth"] },
        { tag: "Sub-base", title: "Compacted MOT Type 1", body: "A compacted Type 1 sub-base — the layer that actually carries the weight.", layers: ["l-base-sub","l-primer","l-earth"] },
        { tag: "Blind", title: "Layer of granite dust", body: "Granite dust is spread and compacted over the Type 1 to bind it and leave a true, even surface.", layers: ["l-base-tar","l-base-sub","l-primer","l-earth"] },
        { tag: "Stone", title: "Your choice of stone on top", body: "The stone you have chosen is spread and levelled off to finish.", layers: ["l-resin resin gravel","l-base-tar","l-base-sub","l-primer","l-earth"] }
      ]
    },
    finishes: {
      kicker: "Gravels", heading: "Pick a", em: "stone.",
      lede: "A handful of popular gravels — many more available. Tap one to see it.",
      more: "+ 10mm & 20mm grades · decorative aggregates",
      items: [
        ["gold","Golden Gravel","20mm"], ["pewter","Grey Slate","20mm"], ["gravel","Cotswold","20mm"],
        ["oyster","Pea Shingle","10mm"], ["bracken","Flint","20mm"], ["forest","Moorland","20mm"]
      ]
    },
    faqs: [
      { q: "Won't the gravel move around or rut?", a: "Not when the base is right. Gravel tipped straight onto soil ruts and spreads; over a membrane, compacted Type 1 and a blinded granite dust layer it beds in and stays where it's laid." },
      { q: "Is gravel good for drainage?", a: "Excellent — water soaks straight through, so there's no standing water, and it's naturally SuDS-friendly." },
      { q: "Is it cheaper than other surfaces?", a: "Generally yes, particularly over large areas — it's one of the most cost-effective ways to surface a driveway or access." },
      { q: "How much maintenance does it need?", a: "Very little — an occasional rake to keep it level and a top-up of stone every few years is all it really takes." },
      { q: "What gravel colours can I have?", a: "A wide range — golds, greys and naturals — so you can complement the property and the landscaping around it." },
      { q: "Is a gravel driveway secure?", a: "The crunch underfoot is a natural deterrent, and a stabilised gravel surface stays firm and even to walk and drive on." }
    ]
  }
];

/* Some projects earn a place in the gallery but not on the service page — flagged
   galleryOnly. The service page reads `workVisible`; the gallery reads `work`. */
module.exports.forEach(svc => {
  svc.workVisible = (svc.work || []).filter(w => !w.galleryOnly);
});
