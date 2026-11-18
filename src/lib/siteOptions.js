export const BRAND = "Mactee Homes";

export const WHATSAPP_NUMBER = "233505814053";

export const whatsappLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const LOCATIONS = [
  "Spintex",
  "East Legon",
  "Cantonments",
  "Airport Residential",
  "Tema",
];

export const PROPERTY_TYPES = [
  "Detached House",
  "Townhouse",
  "Apartment",
  "Land",
];

export const BUDGET_RANGES = [
  { value: "0-300000", label: "Under $300,000 · ≈ GHS 3.6M", min: 0, max: 300000 },
  { value: "300000-500000", label: "$300,000 – $500,000", min: 300000, max: 500000 },
  { value: "500000-800000", label: "$500,000 – $800,000", min: 500000, max: 800000 },
  { value: "800000-", label: "$800,000+ · ≈ GHS 9.6M+", min: 800000, max: null },
  { value: "rent", label: "Rentals up to $2,500 / month", min: null, max: 2500, listing: "For Rent" },
];

export const PHONES = [
  { label: "050 581 4053", href: "tel:+233505814053" },
  { label: "054 365 1283", href: "tel:+233543651283" },
  { label: "Office: 030 398 1966", href: "tel:+233303981966" },
];

export const ADDRESS = "Kakalika Plaza, Off Spintex Road, Accra, Ghana";

export const INSTAGRAM_URL = "https://www.instagram.com/mactee_homes";

export const formatPrice = (property) => {
  if (!property) return "";
  return `$${Number(property.price || 0).toLocaleString("en-US")}`;
};

export const priceSuffix = (property) =>
  property?.listing_type === "For Rent" ? "/month" : "";

export const propertyInquiryMessage = (property) =>
  `Hello Mactee Homes, I'm interested in the ${property.title} in ${property.location} listed at ${formatPrice(property)}${priceSuffix(property)}. Could you share more details and available viewing times?`;