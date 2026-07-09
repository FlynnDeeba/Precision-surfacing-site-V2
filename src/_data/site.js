module.exports = {
  name: "Precision Surfacing",
  logoMain: "Precision",
  logoSub: "Surfacing",
  phone: "07836 441717",
  phoneHref: "tel:07836441717",
  email: "info@psurfacing.co.uk",
  url: "https://precisionsurfacingnorfolk.co.uk",
  telephone: "+447836441717",
  ogImage: "/assets/images/resin/projects/wells-silver-grey/wells-silver-grey-resin-driveway-finished.webp",
  description: "Norfolk's driveway & surfacing specialists — resin bound, tarmac, tar & chip, block paving and gravel. Four generations of expertise, laid in-house.",
  // Site-wide LocalBusiness structured data (JSON-LD) — output in base.njk
  structuredData: {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": "https://precisionsurfacingnorfolk.co.uk/#business",
    name: "Precision Surfacing",
    description: "Norfolk driveway and surfacing specialists — resin bound, tarmac, tar & chip, block paving and gravel.",
    url: "https://precisionsurfacingnorfolk.co.uk",
    telephone: "+447836441717",
    email: "info@psurfacing.co.uk",
    image: "https://precisionsurfacingnorfolk.co.uk/assets/images/resin/projects/wells-silver-grey/wells-silver-grey-resin-driveway-finished.webp",
    priceRange: "££",
    address: { "@type": "PostalAddress", addressRegion: "Norfolk", addressCountry: "GB" },
    areaServed: { "@type": "AdministrativeArea", name: "Norfolk" },
    knowsAbout: ["Resin bound driveways", "Tarmac driveways", "Tar and chip surfacing", "Block paving", "Gravel driveways"]
  },
  locations: "Norwich · Wymondham · Dereham · Wroxham · Aylsham",
  // Primary navigation (shared across every page)
  nav: [
    { label: "Gallery", url: "/gallery/" },
    { label: "Articles", url: "/articles/" },
    { label: "Contact", url: "/contact/", cta: true }
  ]
};
