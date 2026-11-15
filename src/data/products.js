// Static demo data. Baad me API se aayega.
// Real photo lagani ho to product me  image: "https://..."  add kar do.

export const STATUS_LABEL = {
  authorized: "Authorized",
  pending: "Pending",
  unauthorized: "Unauthorized",
  discontinued: "Discontinued",
  cancelled: "Cancelled",
};

export const products = [
  { id: "PRD-1001", name: "Oak Lounge Chair", category: "Furniture", type: "Chair", material: "Oak Wood", variants: 3, price: 320, status: "authorized", updated: "10 Nov 2026, 11:24 AM", emoji: "🪑", tint: "linear-gradient(135deg,#f3e3cf,#e8c9a5)" },
  { id: "PRD-1002", name: "Teak Wood Bed", category: "Furniture", type: "Bed", material: "Teak Wood", variants: 3, price: 1280, status: "authorized", updated: "10 Nov 2026, 10:47 AM", emoji: "🛏️", tint: "linear-gradient(135deg,#efe0cf,#d9b99a)" },
  { id: "PRD-1003", name: "Modern Sideboard", category: "Furniture", type: "Storage", material: "Engineered Wood", variants: 2, price: 740, status: "pending", updated: "09 Nov 2026, 05:30 PM", emoji: "🗄️", tint: "linear-gradient(135deg,#f5dcc0,#e2a974)" },
  { id: "PRD-1004", name: "Rattan Pendant Light", category: "Lighting", type: "Pendant", material: "Rattan", variants: 4, price: 180, status: "authorized", updated: "09 Nov 2026, 04:12 PM", emoji: "💡", tint: "linear-gradient(135deg,#fbe3b8,#f2b25e)" },
  { id: "PRD-1005", name: "Round Dining Table", category: "Furniture", type: "Dining", material: "Solid Wood", variants: 2, price: 860, status: "authorized", updated: "08 Nov 2026, 02:36 PM", emoji: "🍽️", tint: "linear-gradient(135deg,#f3d9b9,#d9a56b)" },
  { id: "PRD-1006", name: "Fabric 3-Seater Sofa", category: "Furniture", type: "Sofa", material: "Fabric", variants: 3, price: 1540, status: "discontinued", updated: "08 Nov 2026, 12:18 PM", emoji: "🛋️", tint: "linear-gradient(135deg,#dfe5c9,#a9b87a)" },
  { id: "PRD-1007", name: "Ceramic Table Lamp", category: "Lighting", type: "Table Lamp", material: "Ceramic", variants: 2, price: 120, status: "discontinued", updated: "07 Nov 2026, 06:20 PM", emoji: "🪔", tint: "linear-gradient(135deg,#f6ead3,#e6c892)" },
  { id: "PRD-1008", name: "Cane Storage Cabinet", category: "Furniture", type: "Storage", material: "Cane / Wood", variants: 3, price: 960, status: "authorized", updated: "07 Nov 2026, 03:11 PM", emoji: "🚪", tint: "linear-gradient(135deg,#f1d3a8,#d4964f)" },
];

export const categoryFilters = [
  ["Furniture", 840], ["Lighting", 620], ["Decor", 490], ["Textiles", 310],
  ["Accessories", 188], ["Outdoor", 126], ["Kitchen", 98], ["Storage", 86],
];

export const statusFilters = [
  ["authorized", 1032], ["pending", 126], ["unauthorized", 0], ["discontinued", 90], ["cancelled", 15],
];
