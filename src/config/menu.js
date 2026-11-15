/*
  Sidebar menu yahin se banta hai.
  - path wala item  = clickable link (route ban chuka hai)
  - path nahi wala  = abhi page nahi bana (Coming soon, click par kuch nahi hoga)

  Naya page banne par sirf us item me  path: "/..."  add kar do
  aur App.jsx me Route laga do.
*/

export const homeItem = { label: "Home", icon: "home", path: "/dashboard" };

export const menu = [
  {
    id: "products", label: "Products", icon: "box",
    children: [
      { label: "Product Library", path: "/products/library" },
      { label: "Add Product", path: "/products/add" },
      { label: "Collections", path: "/products/collection" },
      { label: "Bulk Manage" },
      { label: "Variant Manager" },
      { label: "Bulk Upload Media" },
      { label: "Imports" },
      { label: "Product Authorization" },
    ],
  },
  {
    id: "ai", label: "AI Studio", icon: "sparkles",
    children: [{ label: "Image Studio" }, { label: "Space Visualization" }],
  },
  {
    id: "pricing", label: "Pricing & Costing", icon: "tag",
    children: [{ label: "Product Costings" }, { label: "Price Lists" }, { label: "Costing Heads" }],
  },
  {
    id: "sales", label: "Sales", icon: "cart",
    children: [{ label: "Catalogues" }, { label: "Quotations" }],
  },
  {
    id: "customers", label: "Customers", icon: "users",
    children: [{ label: "Buyer Companies" }, { label: "Buyers" }, { label: "Enquiries" }, { label: "Follow Up" }],
  },
  {
    id: "fairs", label: "Trade Fairs", icon: "calendar",
    children: [{ label: "Fair Master" }, { label: "Fair Enquiries" }],
  },
  {
    id: "marketing", label: "Marketing", icon: "megaphone",
    children: [{ label: "Campaigns" }, { label: "Segments" }, { label: "Communication Logs" }],
  },
  {
    id: "insights", label: "Insights", icon: "chart",
    children: [
      { label: "Sales Analytics" }, { label: "Product Analytics" },
      { label: "Customer Analytics" }, { label: "Trade Fair Analytics" },
    ],
  },
  {
    id: "settings", label: "Settings", icon: "gear", accent: true,
    children: [
      {
        id: "company", label: "Company & Team", icon: "building",
        children: [{ label: "Company Profile" }, { label: "Team Members" }, { label: "Roles & Permissions" }],
      },
      {
        id: "masters", label: "Product Masters", icon: "box",
        children: [
          {
            id: "classification", label: "Classification", icon: "folder",
            children: [
              { label: "Category" }, { label: "Product Type" }, { label: "Material Collection" },
              { label: "Season" }, { label: "HSN" },
            ],
          },
          {
            id: "appearance", label: "Appearance", icon: "palette",
            children: [{ label: "Colour" }, { label: "Finish" }, { label: "Shape" }],
          },
          {
            id: "material", label: "Material & Construction", icon: "layers",
            children: [
              { label: "Material" }, { label: "Production Processes" }, { label: "Production Techniques" },
              { label: "Material Process" }, { label: "Accessory" }, { label: "Component" },
            ],
          },
          {
            id: "mpricing", label: "Pricing", icon: "coins",
            children: [{ label: "Currency & Exchange Rate" }],
          },
        ],
      },
      {
        id: "templates", label: "Template & Channel", icon: "doc",
        children: [
          { label: "Message Templates" }, { label: "Document Templates" },
          { label: "Communication Channels" }, { label: "Legacy Templates" },
        ],
      },
      {
        id: "integration", label: "System Integration", icon: "plug",
        children: [{ label: "Integrations" }, { label: "Activity Log" }],
      },
    ],
  },
];
