export interface Product {
  id: string;
  name: string;
  category: string;
  specs: {
    thickness?: string;
    dimensions?: string;
    color?: string;
    coating?: string;
    certification?: string;
    edgeFinish?: string;
  };
  supplier: string;
  price: number;
  unit: string;
  description: string;
}

export const products: Product[] = [
  {
    id: "p1",
    name: "UltraClear Tempered Glass",
    category: "Tempered Glass",
    specs: {
      thickness: "6mm",
      dimensions: "Customizable up to 2m x 1.2m",
      color: "Clear",
      edgeFinish: "Polished",
      certification: "ISO 9001, SGCC",
    },
    supplier: "Guardian Glass Solutions",
    price: 45,
    unit: "per sqm",
    description: "High-strength tempered glass ideal for office cabin partitions and frameless doors. Excellent clarity and safety.",
  },
  {
    id: "p2",
    name: "Acoustic Laminated Safety Glass",
    category: "Laminated Safety Glass",
    specs: {
      thickness: "10mm (4+2+4)",
      dimensions: "Standard sheets 2.4m x 1.8m",
      color: "Clear",
      coating: "PVB Interlayer, UV Protected",
      certification: "ANSI Z97.1",
    },
    supplier: "ToughTuff Fabrication",
    price: 75,
    unit: "per sqm",
    description: "Premium laminated glass suitable for balcony railings. Provides excellent sound insulation, safety against high winds, and UV protection.",
  },
  {
    id: "p3",
    name: "Standard Float Glass",
    category: "Float Glass",
    specs: {
      thickness: "4mm",
      dimensions: "Bulk sheets 3.2m x 2.2m",
      color: "Clear",
    },
    supplier: "National Glass Works",
    price: 18,
    unit: "per sqm",
    description: "Budget-friendly primary float glass. High optical clarity, suitable for standard residential windows and general applications. Available in large quantities.",
  },
  {
    id: "p4",
    name: "EnergySaver Insulated Glass Unit (IGU)",
    category: "Insulated Glass Unit",
    specs: {
      thickness: "22mm (5+12 Argon+5)",
      dimensions: "Custom sizes up to 2.5m height",
      coating: "Low-E",
      certification: "IGCC",
    },
    supplier: "EcoGlaze Industries",
    price: 110,
    unit: "per sqm",
    description: "Double-glazed insulated glass unit featuring a Low-E coating and argon gas fill. Maximum thermal efficiency for energy-conscious commercial/residential windows.",
  },
  {
    id: "p5",
    name: "Tinted Tempered Glass",
    category: "Tempered Glass",
    specs: {
      thickness: "8mm",
      dimensions: "Max 3m x 2m",
      color: "Bronze",
      edgeFinish: "Seamed",
      certification: "CE",
    },
    supplier: "SolarTint Manufacturers",
    price: 55,
    unit: "per sqm",
    description: "Bronze-tinted tempered glass widely used for architectural facades and decorative partitions where sun glare reduction is required.",
  },
  {
    id: "p6",
    name: "Frameless Shower Hinge",
    category: "Hardware",
    specs: {
      color: "Matte Black",
      certification: "Corrosion Resistant Grade 304",
    },
    supplier: "BuildRight Metalworks",
    price: 25,
    unit: "per unit",
    description: "Heavy-duty stainless steel hinge for frameless shower glass installations. Supports 8mm to 12mm glass thickness.",
  },
  {
    id: "p7",
    name: "Bullet-Resistant Polycarbonate Laminated Glass",
    category: "Laminated Safety Glass",
    specs: {
      thickness: "32mm",
      dimensions: "1.2m x 2.1m",
      color: "Clear",
      certification: "UL 752 Level 3",
    },
    supplier: "SecureShield Defense Glass",
    price: 450,
    unit: "per sqm",
    description: "Multi-ply laminated structure combining glass and polycarbonate. Designed for banks, jewelry stores, and high-security architectural needs.",
  },
  {
    id: "p8",
    name: "Frosted Tempered Glass",
    category: "Tempered Glass",
    specs: {
      thickness: "12mm",
      dimensions: "Max 2.5m x 1.5m",
      color: "Frosted / Translucent",
      edgeFinish: "Flat Polished",
    },
    supplier: "Obscura Glass Artisans",
    price: 68,
    unit: "per sqm",
    description: "Acid-etched frosted glass providing privacy while allowing light transmission. Perfect for bathroom enclosures and high-end office dividers.",
  },
  {
    id: "p9",
    name: "Triple Silver Low-E IGU",
    category: "Insulated Glass Unit",
    specs: {
      thickness: "24mm (6+12+6)",
      dimensions: "Customizable",
      color: "Neutral",
      coating: "Triple Silver Low-E",
    },
    supplier: "ClimateControl Glass",
    price: 135,
    unit: "per sqm",
    description: "Advanced triple silver low-E insulated glass unit. Unmatched solar control and thermal insulation for high-rise building facades.",
  },
  {
    id: "p10",
    name: "Heavy Duty Spider Fitting",
    category: "Hardware",
    specs: {
      color: "Chrome Polished",
      certification: "SS316",
    },
    supplier: "BuildRight Metalworks",
    price: 85,
    unit: "per unit",
    description: "4-way stainless steel spider fitting for point-fixed glass facades and canopies. Engineered for extreme weather and wind loads.",
  },
  {
    id: "p11",
    name: "Extra Clear Low Iron Float Glass",
    category: "Float Glass",
    specs: {
      thickness: "19mm",
      dimensions: "Jumbo Size 3.3m x 6m",
      color: "Extra Clear (Low Iron)",
    },
    supplier: "Crystal View Suppliers",
    price: 90,
    unit: "per sqm",
    description: "Thick, low-iron float glass providing maximum transparency with zero green tint. Ideal for aquarium tanks, premium displays, and luxury furniture.",
  },
  {
    id: "p12",
    name: "Copper-Free Silver Mirror",
    category: "Mirror",
    specs: {
      thickness: "5mm",
      dimensions: "Standard 2.44m x 1.83m",
      color: "Silver",
      coating: "Double Coated Eco-Friendly Backing",
    },
    supplier: "Lumina Mirror Corp",
    price: 35,
    unit: "per sqm",
    description: "Environmentally friendly, copper-free and lead-free silver mirror. Highly resistant to humidity and corrosion, excellent for bathroom installations.",
  },
  {
    id: "p13",
    name: "Ceramic Frit Spandrel Glass",
    category: "Tempered Glass",
    specs: {
      thickness: "6mm",
      dimensions: "Customized",
      color: "Opaque Black",
      coating: "Ceramic Frit (Baked)",
    },
    supplier: "Guardian Glass Solutions",
    price: 60,
    unit: "per sqm",
    description: "Heat-treated spandrel glass with a baked-on ceramic frit. Completely opaque to hide structural floors and columns in curtain wall applications.",
  },
  {
    id: "p14",
    name: "Aluminium U-Channel Profile",
    category: "Hardware",
    specs: {
      color: "Anodized Silver",
      dimensions: "3m length",
    },
    supplier: "ProfileTech Aluminum",
    price: 15,
    unit: "per unit",
    description: "Deep U-channel for securing frameless glass panels (10-12mm) onto floors and walls. Includes rubber gaskets for a secure fit.",
  },
  {
    id: "p15",
    name: "Hurricane-Resistant SGP Laminated Glass",
    category: "Laminated Safety Glass",
    specs: {
      thickness: "13.52mm (6+1.52 SGP+6)",
      dimensions: "Max 3m x 2m",
      color: "Clear",
      coating: "SentryGlas Plus (SGP) Interlayer",
      certification: "Miami-Dade County NOA",
    },
    supplier: "ToughTuff Fabrication",
    price: 130,
    unit: "per sqm",
    description: "Ultimate storm protection glass using SentryGlas Plus interlayer. 5x stronger and 100x stiffer than conventional PVB glass. For coastal regions.",
  }
];
