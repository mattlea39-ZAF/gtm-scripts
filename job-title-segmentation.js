/**
 * Clay Code Column — Job Title Segmentation
 *
 * Paste this entire script into a Clay "Code" column.
 * It reads the "Job Title" column and returns one of 7 segment
 * names, or "Other" if no segment matches.
 *
 * HOW TO USE IN CLAY:
 *   1. Add a new column → choose "Code"
 *   2. Paste this script
 *   3. If your column name differs from "Job Title", update line 17
 *
 * PRIORITY ORDER (first match wins):
 *   1. Operations Decision Maker
 *   2. General Manager & Multi-Unit
 *   3. Culinary Leadership
 *   4. Restaurant Technology & IT
 *   5. C-Suite, Founder & Owner
 *   6. Franchise Operations
 *   7. Not Relevant
 *   default → Other
 */

// ── CONFIG: adjust this if your column has a different name in Clay ──────────
const raw = input["Job Title"] ?? "";
// ─────────────────────────────────────────────────────────────────────────────

const title = raw.toLowerCase().trim();

/**
 * Returns true if the lowercased title matches any keyword.
 * Uses word-boundary regex so short abbreviations like "coo" or "ceo"
 * don't accidentally match words like "cook".
 */
function anyMatch(keywords) {
  return keywords.some((kw) => {
    // Escape any regex special characters in the keyword
    const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`\\b${escaped}\\b`).test(title);
  });
}

const segments = [
  // ── SEGMENT 1 ──────────────────────────────────────────────────────────────
  {
    name: "Operations Decision Maker",
    keywords: [
      "vp of operations",
      "vice president of operations",
      "vice president operations",
      "director of operations",
      "director operations",
      "operational director",
      "operations director",
      "senior director of operations",
      "regional director of operations",
      "area director of operations",
      "director of operational excellence",
      "operations excellence",
      "coo",
      "chief operating officer",
      "vp operations",
      "svp operations",
      "executive director of operations",
      "evp operations",
    ],
  },

  // ── SEGMENT 2 ──────────────────────────────────────────────────────────────
  {
    name: "General Manager & Multi-Unit",
    keywords: [
      "general manager",
      "multi unit",
      "multi-unit",
      "district manager",
      "area director",
      "area manager",
      "regional manager",
      "regional operations manager",
      "area operations manager",
      "area general manager",
      "resident district manager",
      "area coach",
      "area leader",
    ],
  },

  // ── SEGMENT 3 ──────────────────────────────────────────────────────────────
  {
    name: "Culinary Leadership",
    keywords: [
      "executive chef",
      "executive sous chef",
      "corporate chef",
      "corporate executive chef",
      "culinary director",
      "culinary manager",
      "culinary systems",
      "culinary operations",
      "culinary partner",
      "kitchen manager",
      "executive kitchen manager",
      "regional kitchen manager",
      "regional chef",
      "head chef",
      "chef de cuisine",
      "culinary development",
      "culinary innovation",
      "culinary lead",
      "chief culinary",
    ],
  },

  // ── SEGMENT 4 ──────────────────────────────────────────────────────────────
  {
    name: "Restaurant Technology & IT",
    keywords: [
      "director of restaurant technology",
      "director of information technology",
      "director of it",
      "vp of technology",
      "vice president of technology",
      "vice president of information technology",
      "chief information officer",
      "cio",
      "restaurant technology",
      "restaurant systems",
      "store systems",
      "back office systems",
      "point of sale manager",
      "pos manager",
      "it director",
      "it manager",
      "director of enterprise applications",
      "director of information systems",
      "technology director",
      "senior director of it",
      "senior manager restaurant technology",
      "director of it infrastructure",
    ],
  },

  // ── SEGMENT 5 ──────────────────────────────────────────────────────────────
  {
    name: "C-Suite, Founder & Owner",
    keywords: [
      "chief executive",
      "ceo",
      "president",
      "founder",
      "co-founder",
      "owner/operator",
      "owner / operator",
      "managing director",
      "managing partner",
      "managing owner",
      "principal owner",
      "business owner",
      "owner/ceo",
      "ceo/founder",
      "ceo & owner",
      "ceo / owner",
    ],
  },

  // ── SEGMENT 6 ──────────────────────────────────────────────────────────────
  {
    name: "Franchise Operations",
    keywords: [
      "franchise owner",
      "franchisee",
      "franchise business consultant",
      "franchise director",
      "franchise operations",
      "franchise partner",
      "multi-unit franchisee",
      "master franchisor",
      "area franchise",
    ],
  },

  // ── SEGMENT 7 (checked last so legitimate ops titles aren't excluded) ──────
  {
    name: "Not Relevant",
    keywords: [
      "retired",
      "barista",
      "bartender",
      "server",
      "delivery driver",
      "cashier",
      "line cook",
      "real estate agent",
      "realtor",
      "tattoo",
      "lawyer",
      "attorney",
      "doctor",
      "nurse",
      "teacher",
      "professor",
      "student",
      "janitor",
      "electrician",
      "mechanic",
      "musician",
      "artist",
      "photographer",
      "life coach",
      "fitness",
    ],
  },
];

// Evaluate segments in priority order; return the first match
for (const segment of segments) {
  if (anyMatch(segment.keywords)) {
    return segment.name;
  }
}

return "Other";
