// Location landing pages.
//   general  -> /locations/driveways-{slug}/
//   resin    -> /locations/resin-driveways-{slug}/
// Each town carries a unique intro note + curated nearby towns (that also have
// pages) so every page has genuinely differentiated content and internal links.

const NAMES = {
  "aylsham":        "Aylsham",
  "costessey":      "Costessey",
  "cringleford":    "Cringleford",
  "cromer":         "Cromer",
  "dereham":        "Dereham",
  "drayton":        "Drayton",
  "fakenham":       "Fakenham",
  "hellesdon":      "Hellesdon",
  "holt":           "Holt",
  "kings-lynn":     "King's Lynn",
  "norfolk-broads": "the Norfolk Broads",
  "north-walsham":  "North Walsham",
  "norwich":        "Norwich",
  "sheringham":     "Sheringham",
  "sprowston":      "Sprowston",
  "taverham":       "Taverham",
  "wymondham":      "Wymondham"
};

const NOTE = {
  "aylsham":        "From the market place out to the surrounding lanes, we install and replace driveways across Aylsham to suit everything from its Georgian frontages to newer estate homes.",
  "costessey":      "Old and New Costessey have grown fast on Norwich's western edge — we surface driveways for both the established streets and the newer developments.",
  "cringleford":    "A sought-after village on the south-west edge of Norwich beside the A11 — we lay clean, high-kerb-appeal driveways for its family homes.",
  "cromer":         "On the exposed north-Norfolk coast, driveways here have to take salt air and weather — we build and finish them to stand up to it.",
  "dereham":        "Right in the middle of the county, Dereham is an easy base for our teams — we install every surface we offer across the town and its villages.",
  "drayton":        "A busy village just north-west of Norwich — we handle driveways here from tight town frontages to larger plots off the Fakenham Road.",
  "fakenham":       "A north-Norfolk market town where longer drives and rural access roads are common — we scope and surface them all, in and around Fakenham.",
  "hellesdon":      "One of Norwich's largest suburbs — we resurface and replace tired driveways right across Hellesdon's established streets.",
  "holt":           "A smart Georgian town near the coast — we match driveways to Holt's period character and its many carefully renovated properties.",
  "kings-lynn":     "A historic west-Norfolk port town — we work throughout King's Lynn and its surrounding villages on drives of every size.",
  "norfolk-broads": "Across the Broads the ground sits soft and the water table runs high — we build the sub-base up properly so driveways here drain and hold for the long term.",
  "north-walsham":  "A north-Norfolk market town — we install driveways throughout North Walsham and the villages between it and the coast.",
  "norwich":        "From the terraces of the Golden Triangle to the outer estates, we lay, resurface and replace driveways right across Norwich.",
  "sheringham":     "A north-Norfolk coastal town where driveways face sea air and slope alike — we finish them to cope with both.",
  "sprowston":      "A large suburb on Norwich's north-east edge with plenty of newer housing — we surface driveways for older and new-build homes alike.",
  "taverham":       "A settled village north-west of Norwich — we handle driveway replacements and fresh installs across Taverham's estates.",
  "wymondham":      "A historic market town south-west of Norwich, known for its abbey — we lay driveways to suit both its period and its modern homes."
};

const NEAR = {
  "aylsham":        ["north-walsham", "cromer", "norwich"],
  "costessey":      ["drayton", "taverham", "norwich"],
  "cringleford":    ["norwich", "wymondham"],
  "cromer":         ["sheringham", "holt", "north-walsham"],
  "dereham":        ["norwich", "fakenham"],
  "drayton":        ["taverham", "costessey", "hellesdon"],
  "fakenham":       ["holt", "dereham", "kings-lynn"],
  "hellesdon":      ["norwich", "drayton", "sprowston"],
  "holt":           ["sheringham", "cromer", "fakenham"],
  "kings-lynn":     ["fakenham", "dereham"],
  "norfolk-broads": ["norwich", "sprowston"],
  "north-walsham":  ["cromer", "aylsham", "sheringham"],
  "norwich":        ["sprowston", "hellesdon", "costessey"],
  "sheringham":     ["cromer", "holt", "north-walsham"],
  "sprowston":      ["norwich", "hellesdon", "north-walsham"],
  "taverham":       ["drayton", "costessey", "norwich"],
  "wymondham":      ["norwich", "cringleford"]
};

function build(slug) {
  return {
    slug,
    name: NAMES[slug],
    note: NOTE[slug],
    nearby: (NEAR[slug] || []).map((s) => ({ slug: s, name: NAMES[s] }))
  };
}

const GENERAL = [
  "aylsham", "costessey", "cringleford", "cromer", "dereham", "drayton",
  "fakenham", "hellesdon", "holt", "kings-lynn", "norfolk-broads",
  "north-walsham", "norwich", "sheringham", "sprowston", "taverham", "wymondham"
];

const RESIN = [
  "aylsham", "holt", "kings-lynn", "norfolk-broads",
  "norwich", "sheringham", "wymondham"
];

module.exports = {
  driveways: GENERAL.map(build),
  resinDriveways: RESIN.map(build)
};
