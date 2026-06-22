import React, { useEffect, useMemo, useRef, useState } from "https://esm.sh/react@19.2.6";
import { createRoot } from "https://esm.sh/react-dom@19.2.6/client";
import {
  ArrowRight,
  BadgeDollarSign,
  Building2,
  Check,
  Clock3,
  FileText,
  Filter,
  Home,
  Landmark,
  MapPin,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  X,
} from "https://esm.sh/lucide-react@0.482.0?deps=react@19.2.6";

const h = React.createElement;

const properties = [
  {
    id: "VTX-119674",
    title: "944 W Main St Tax Lien Certificate",
    address: "944 W Main St, Crisfield, MD 21817",
    county: "Somerset County",
    state: "MD",
    assetType: "Tax Lien Certificate",
    propertyType: "Commercial",
    status: "Available for review",
    lienAmount: 3731.1,
    assessedValue: 194400,
    lienExpiration: "May 2027",
    purchasedAtTaxSale: "May 2025",
    yearBuilt: "1900",
    buildingSize: "4,550 sq ft",
    landSize: "3,750 sq ft",
    coordinates: [37.9787933, -75.8612786],
    image: "/images/properties/119674/944-w-main-st-front-subject-property.png",
    images: [
      "/images/properties/119674/944-w-main-st-front-subject-property.png",
      "/images/properties/119674/944-w-main-st-rear-subject-property.png",
    ],
    highlights: ["Commercial property", "Certificate purchased May 2025", "Reported lien expiration: May 2027"],
  },
  {
    id: "VTX-010788",
    title: "12715 Valley View Ave Tax Lien Certificate",
    address: "12715 Valley View Ave, Cresaptown, MD 21502",
    county: "Allegany County",
    state: "MD",
    assetType: "Tax Lien Certificate",
    propertyType: "Residential",
    status: "Available for review",
    lienAmount: 2246.38,
    assessedValue: 42500,
    lienExpiration: "May 2027",
    purchasedAtTaxSale: "May 2025",
    yearBuilt: "1930",
    buildingSize: "546 sq ft",
    landSize: "7,000 sq ft",
    coordinates: [39.5930994, -78.822741],
    image: "/images/properties/010788/12715-valley-view-ave-subject-property.png",
    images: ["/images/properties/010788/12715-valley-view-ave-subject-property.png"],
    highlights: ["Residential property", "Certificate purchased May 2025", "Reported lien expiration: May 2027"],
  },
  {
    id: "VTX-080304",
    title: "28209 Whitehaven Ferry Rd Tax Lien Certificate",
    address: "28209 Whitehaven Ferry Rd, Marion Station, MD 21853",
    county: "Somerset County",
    state: "MD",
    propertyType: "Residential",
    status: "Available for review",
    lienAmount: 1701.38,
    assessedValue: 50633,
    lienExpiration: "May 2027",
    purchasedAtTaxSale: "May 2025",
    yearBuilt: "1968",
    buildingSize: "1,776 sq ft",
    landSize: "1 acre",
    coordinates: [38.25853, -75.773413],
    image: "/images/properties/80304/28209-whitehaven-ferry-rd-front.jpg",
    images: [
      "/images/properties/80304/28209-whitehaven-ferry-rd-front.jpg",
      "/images/properties/80304/28209-whitehaven-ferry-rd-exterior-01.jpg",
      "/images/properties/80304/28209-whitehaven-ferry-rd-exterior-02.jpg",
    ],
    highlights: ["Residential property", "Certificate purchased May 2025", "Reported lien expiration: May 2027"],
  },
];

const filters = {
  state: ["All States", "MD"],
  assetType: ["All Assets", "Tax Lien Certificate"],
  propertyType: ["All Types", "Residential", "Commercial"],
};

const contactEmail = "vectormanager@vectorbrother.com";
const contactPhone = "240-869-9628";
const formSubmitEndpoint = `https://formsubmit.co/ajax/${contactEmail}`;
const googleSheetEndpoint = "";

function money(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function Icon({ icon, size = 18 }) {
  return h(icon, { size, strokeWidth: 2.2, "aria-hidden": "true" });
}

function Logo() {
  return h(
    "a",
    { className: "logo", href: "#top", "aria-label": "Vector Tax Lien Marketplace home" },
    h("span", { className: "logo-v" }, "V"),
    h("span", { className: "logo-text" }, "ector")
  );
}

function Header() {
  return h(
    "header",
    { className: "site-header" },
    h(Logo),
    h(
      "nav",
      { className: "nav-links", "aria-label": "Main navigation" },
      h("a", { href: "#inventory" }, "Inventory"),
      h("a", { href: "#process" }, "Process"),
      h("a", { href: "#contact" }, "Contact")
    ),
    h(
      "a",
      { className: "header-cta", href: "#contact" },
      "Request Packet",
      h(Icon, { icon: ArrowRight, size: 16 })
    )
  );
}

function Hero() {
  return h(
    "section",
    { id: "top", className: "hero" },
    h("div", { className: "hero-image", "aria-hidden": "true" }),
    h(
      "div",
      { className: "hero-content" },
      h("p", { className: "eyebrow" }, "Maryland Tax Lien Certificate Marketplace"),
      h("h1", null, "Maryland Tax Lien Certificates"),
      h(
        "p",
        { className: "hero-copy" },
        "Browse Maryland tax lien certificates, lien assignments, and property-backed opportunities prepared for qualified investor review."
      ),
      h(
        "div",
        { className: "hero-actions" },
        h("a", { className: "button button-primary", href: "#inventory" }, "View Inventory", h(Icon, { icon: Home })),
        h("a", { className: "button button-secondary", href: "#contact" }, "Talk to Vector", h(Icon, { icon: FileText }))
      ),
      h(
        "div",
        { className: "hero-stats", "aria-label": "Marketplace highlights" },
        h("div", null, h("strong", null, "3"), h("span", null, "Current assets")),
        h("div", null, h("strong", null, "$7.7K"), h("span", null, "Tax face amount")),
        h("div", null, h("strong", null, "Maryland"), h("span", null, "Initial market"))
      )
    )
  );
}

function FilterBar({ criteria, setCriteria, query, setQuery }) {
  function update(name, value) {
    setCriteria((current) => ({ ...current, [name]: value }));
  }

  return h(
    "div",
    { className: "filter-bar" },
    h(
      "label",
      { className: "search-box" },
      h(Icon, { icon: Search }),
      h("input", {
        type: "search",
        value: query,
        placeholder: "Search by city, county, asset ID, or property type",
        onChange: (event) => setQuery(event.target.value),
      })
    ),
    Object.entries(filters).map(([name, options]) =>
      h(
        "label",
        { className: "select-wrap", key: name },
        h("span", null, name === "assetType" ? "Asset" : name === "propertyType" ? "Type" : "State"),
        h(
          "select",
          { value: criteria[name], onChange: (event) => update(name, event.target.value) },
          options.map((option) => h("option", { key: option }, option))
        )
      )
    ),
    h(
      "button",
      {
        className: "icon-button",
        type: "button",
        title: "Reset filters",
        onClick: () => {
          setQuery("");
          setCriteria({ state: "All States", assetType: "All Assets", propertyType: "All Types" });
        },
      },
      h(Icon, { icon: SlidersHorizontal })
    )
  );
}

function PropertyCard({ item, onSelect }) {
  return h(
    "button",
    { className: "property-card", type: "button", onClick: () => onSelect(item) },
    h(
      "div",
      { className: "property-photo" },
      h("img", { src: item.image, alt: `${item.title} in ${item.county}, Maryland` }),
      h("span", null, item.status)
    ),
    h(
      "div",
      { className: "property-body" },
      h("div", { className: "card-kicker" }, h("span", null, item.id), h("span", null, item.assetType)),
      h("h3", null, item.title),
      h("p", { className: "address" }, h(Icon, { icon: MapPin, size: 16 }), item.address),
      h(
        "dl",
        { className: "property-metrics" },
        h("div", null, h("dt", null, "Terms"), h("dd", null, "Request")),
        h("div", null, h("dt", null, "Tax Face"), h("dd", null, money(item.lienAmount))),
        h("div", null, h("dt", null, "Assessment"), h("dd", null, money(item.assessedValue))),
        h("div", null, h("dt", null, "Expires"), h("dd", null, item.lienExpiration))
      ),
      h(
        "div",
        { className: "card-footer" },
        h("span", { className: "risk risk-review" }, "Diligence required"),
        h("span", { className: "text-button" }, "Details", h(Icon, { icon: ArrowRight, size: 16 }))
      )
    )
  );
}

function AssetLocationMap({ item }) {
  const [lat, lon] = item.coordinates;
  const range = 0.018;
  const bbox = [lon - range, lat - range, lon + range, lat + range].join(",");
  const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(
    bbox
  )}&layer=mapnik&marker=${encodeURIComponent(`${lat},${lon}`)}`;
  const largerMapUrl = `https://www.openstreetmap.org/?mlat=${encodeURIComponent(lat)}&mlon=${encodeURIComponent(lon)}#map=15/${encodeURIComponent(
    lat
  )}/${encodeURIComponent(lon)}`;

  return h(
    "section",
    { className: "asset-location" },
    h(
      "div",
      { className: "asset-location-heading" },
      h("div", null, h("p", { className: "eyebrow" }, "Location"), h("h4", null, `${item.county}, ${item.state}`)),
      h("span", null, "Approximate")
    ),
    h(
      "div",
      { className: "asset-detail-map" },
      h("iframe", {
        title: `${item.title} map`,
        src: embedUrl,
        loading: "lazy",
        referrerPolicy: "no-referrer-when-downgrade",
        allowFullScreen: true,
      }),
      h("a", { className: "larger-map-link", href: largerMapUrl, target: "_blank", rel: "noreferrer" }, "Open larger map")
    ),
    h("p", null, "Use the map to inspect the surrounding area. Confirm parcel boundaries and exact location before publishing.")
  );
}

function Inventory() {
  const [query, setQuery] = useState("");
  const [criteria, setCriteria] = useState({ state: "All States", assetType: "All Assets", propertyType: "All Types" });
  const [selected, setSelected] = useState(null);

  const visibleProperties = useMemo(() => {
    const term = query.trim().toLowerCase();
    return properties.filter((item) => {
      const matchesSearch =
        !term ||
        [item.id, item.title, item.address, item.county, item.state, item.assetType, item.propertyType]
          .join(" ")
          .toLowerCase()
          .includes(term);
      const matchesState = criteria.state === "All States" || item.state === criteria.state;
      const matchesAsset = criteria.assetType === "All Assets" || item.assetType === criteria.assetType;
      const matchesType = criteria.propertyType === "All Types" || item.propertyType === criteria.propertyType;
      return matchesSearch && matchesState && matchesAsset && matchesType;
    });
  }, [criteria, query]);

  return h(
    "section",
    { id: "inventory", className: "section inventory-section" },
    h(
      "div",
      { className: "section-heading split-heading" },
      h("div", null, h("p", { className: "eyebrow" }, "Maryland Inventory"), h("h2", null, "Tax lien certificates ready for investor review")),
      h("p", null, "Each Maryland tax lien listing is a starting point for due diligence, certificate review, title questions, and transaction terms. Confirm the certificate, parcel, foreclosure process, and closing documents before purchase.")
    ),
    h(FilterBar, { criteria, setCriteria, query, setQuery }),
    h(
      "div",
      { className: "result-row" },
      h("span", null, `${visibleProperties.length} matching assets`),
      h("span", null, "Maryland tax lien inventory")
    ),
    h(
      "div",
      { className: "property-grid" },
      visibleProperties.map((item) => h(PropertyCard, { key: item.id, item, onSelect: setSelected }))
    ),
    selected && h(AssetModal, { item: selected, onClose: () => setSelected(null) })
  );
}

function AssetModal({ item, onClose }) {
  const [activeImage, setActiveImage] = useState(item.image);

  return h(
    "div",
    { className: "modal-backdrop", role: "presentation", onClick: onClose },
    h(
      "article",
      { className: "modal", role: "dialog", "aria-modal": "true", "aria-labelledby": "asset-title", onClick: (event) => event.stopPropagation() },
      h(
        "button",
        { className: "modal-close", type: "button", title: "Close", onClick: onClose },
        h(Icon, { icon: X })
      ),
      h(
        "div",
        { className: "modal-media" },
        h("div", { className: "modal-photo" }, h("img", { src: activeImage, alt: `${item.title} in ${item.county}, Maryland` })),
        item.images.length > 1 &&
          h(
            "div",
            { className: "photo-thumbnails", "aria-label": "Property photos" },
            item.images.map((image, index) =>
              h(
                "button",
                {
                  type: "button",
                  className: image === activeImage ? "photo-thumb active" : "photo-thumb",
                  onClick: () => setActiveImage(image),
                  "aria-label": `View property photo ${index + 1}`,
                  key: image,
                },
                h("img", { src: image, alt: "" })
              )
            )
          )
      ),
      h(
        "div",
        { className: "modal-content" },
        h("p", { className: "eyebrow" }, item.id),
        h("h3", { id: "asset-title" }, item.title),
        h("p", { className: "address" }, h(Icon, { icon: MapPin, size: 16 }), item.address),
        h(
          "div",
          { className: "modal-metrics" },
          h("div", null, h("span", null, "Offering Terms"), h("strong", null, "Request")),
          h("div", null, h("span", null, "Tax Face Amount"), h("strong", null, money(item.lienAmount))),
          h("div", null, h("span", null, "Assessed Value"), h("strong", null, money(item.assessedValue))),
          h("div", null, h("span", null, "Lien Expiration"), h("strong", null, item.lienExpiration)),
          h("div", null, h("span", null, "Tax Sale Purchase"), h("strong", null, item.purchasedAtTaxSale)),
          h("div", null, h("span", null, "Year Built"), h("strong", null, item.yearBuilt)),
          h("div", null, h("span", null, "Building Size"), h("strong", null, item.buildingSize)),
          h("div", null, h("span", null, "Land Size"), h("strong", null, item.landSize))
        ),
        h(
          "ul",
          { className: "check-list" },
          item.highlights.map((point) => h("li", { key: point }, h(Icon, { icon: Check, size: 16 }), point))
        ),
        h(AssetLocationMap, { item }),
        h(
          "a",
          { className: "button button-primary full-button", href: "#contact", onClick: onClose },
          "Request Due Diligence Packet",
          h(Icon, { icon: FileText })
        )
      )
    )
  );
}

function Process() {
  const steps = [
    { icon: Filter, title: "Screen the inventory", text: "Review asset type, tax face amount, location, lien expiration, and collateral profile." },
    { icon: ShieldCheck, title: "Request the packet", text: "Vector shares available tax records, certificate notes, title questions, and diligence material." },
    { icon: BadgeDollarSign, title: "Negotiate terms", text: "Buy the certificate, fund a position, or discuss a portfolio sale with clear closing steps." },
  ];

  return h(
    "section",
    { id: "process", className: "section process-section" },
    h(
      "div",
      { className: "process-intro" },
      h("p", { className: "eyebrow" }, "How It Works"),
      h("h2", null, "A clearer way to review Maryland tax lien inventory"),
      h("p", null, "The goal is not to make a legal promise online. The goal is to make the opportunity visible, organized, and easy for qualified buyers to evaluate.")
    ),
    h(
      "div",
      { className: "process-grid" },
      steps.map((step, index) =>
        h(
          "article",
          { className: "process-card", key: step.title },
          h("span", { className: "step-number" }, `0${index + 1}`),
          h("div", { className: "process-icon" }, h(Icon, { icon: step.icon, size: 24 })),
          h("h3", null, step.title),
          h("p", null, step.text)
        )
      )
    )
  );
}

function TrustBand() {
  return h(
    "section",
    { className: "trust-band", "aria-label": "Investor review points" },
    h("div", null, h(Icon, { icon: Landmark, size: 22 }), h("span", null, "County records first")),
    h("div", null, h(Icon, { icon: Clock3, size: 22 }), h("span", null, "Redemption timeline tracked")),
    h("div", null, h(Icon, { icon: Building2, size: 22 }), h("span", null, "Property-backed positions")),
    h("div", null, h(Icon, { icon: FileText, size: 22 }), h("span", null, "Document packet on request"))
  );
}

function Contact() {
  const [formStatus, setFormStatus] = useState({ type: "idle", message: "" });

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const interest = String(formData.get("interest") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const payload = {
      name,
      email,
      phone,
      interest,
      message,
      source: "vectortaxlien.com",
      _subject: `Vector Tax Lien inquiry${name ? ` from ${name}` : ""}`,
      _template: "table",
      _captcha: "false",
    };

    setFormStatus({ type: "loading", message: "Sending your request..." });

    try {
      const response = await fetch(formSubmitEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      if (googleSheetEndpoint) {
        await fetch(googleSheetEndpoint, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload),
        });
      }

      form.reset();
      setFormStatus({
        type: "success",
        message: `Request sent. Vector will follow up using the contact information provided.`,
      });
    } catch (error) {
      setFormStatus({
        type: "error",
        message: `We could not submit the form. Please email ${contactEmail} directly.`,
      });
    }
  }

  return h(
    "section",
    { id: "contact", className: "section contact-section" },
    h(
      "div",
      { className: "contact-copy" },
      h("p", { className: "eyebrow" }, "Investor Access"),
      h("h2", null, "Request asset details or submit an offer"),
      h("p", null, "Send the asset ID, target budget, and whether you want to buy certificates, assignments, or a portfolio package."),
      h(
        "div",
        { className: "contact-direct" },
        h(
          "a",
          { href: `tel:+1${contactPhone.replace(/\D/g, "")}` },
          h("span", null, "Work Phone"),
          h("strong", null, contactPhone)
        ),
        h(
          "a",
          { href: `mailto:${contactEmail}` },
          h("span", null, "Email"),
          h("strong", null, contactEmail)
        )
      )
    ),
    h(
      "form",
      {
        className: "contact-form",
        onSubmit: handleSubmit,
      },
      h("label", null, "Name", h("input", { name: "name", placeholder: "Your name", required: true })),
      h("label", null, "Email", h("input", { name: "email", type: "email", placeholder: "you@example.com", required: true })),
      h("label", null, "Phone", h("input", { name: "phone", type: "tel", placeholder: "(555) 123-4567" })),
      h(
        "label",
        null,
        "Interest",
        h(
          "select",
          { name: "interest", defaultValue: "Request due diligence packet" },
          h("option", null, "Request due diligence packet"),
          h("option", null, "Submit an offer"),
          h("option", null, "Buy a portfolio"),
          h("option", null, "Ask a legal/title question")
        )
      ),
      h("label", null, "Message", h("textarea", { name: "message", rows: 5, placeholder: "Asset ID, budget, preferred state, timeline, or questions" })),
      h(
        "button",
        { className: "button button-primary", type: "submit", disabled: formStatus.type === "loading" },
        formStatus.type === "loading" ? "Sending..." : "Send Request",
        h(Icon, { icon: ArrowRight })
      ),
      formStatus.message &&
        h(
          "p",
          { className: `form-status form-status-${formStatus.type}`, role: "status" },
          formStatus.message
        )
    )
  );
}

function Footer() {
  return h(
    "footer",
    { className: "site-footer" },
    h(Logo),
    h("p", null, "Tax lien assets involve legal and title risk. This site is for investor review and does not replace legal, tax, or title advice.")
  );
}

function App() {
  return h(React.Fragment, null, h(Header), h("main", null, h(Hero), h(TrustBand), h(Inventory), h(Process), h(Contact)), h(Footer));
}

createRoot(document.getElementById("root")).render(h(App));
