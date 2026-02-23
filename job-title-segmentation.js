/**
 * Clay Formula — Job Title Segmentation (Clayscript)
 *
 * HOW TO USE:
 *   1. In Clay, add a new column → choose "Formula"
 *   2. Paste ONLY the expression below (everything between the dashes)
 *   3. Clay will replace {{Job Title}} with each row's value automatically
 *
 * This is written as a single IIFE expression — no top-level return needed.
 *
 * SEGMENT MAPPING (first match wins):
 *   Segment 1 → Operations Decision Maker
 *   Segment 2 → General Manager & Multi-Unit
 *   Segment 3 → Culinary Leadership
 *   Segment 4 → Restaurant Technology & IT
 *   Segment 5 → C-Suite, Founder & Owner
 *   Segment 6 → Franchise Operations
 *   Segment 7 → Not Relevant
 *   Segment 8 → Other
 */

// ── PASTE THIS EXPRESSION INTO CLAY ─────────────────────────────────────────

((t) => {
  const s = (kws) =>
    kws.some((kw) =>
      new RegExp("\\b" + kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b").test(t)
    );

  if (s(["vp of operations","vice president of operations","vice president operations","director of operations","director operations","operational director","operations director","senior director of operations","regional director of operations","area director of operations","director of operational excellence","operations excellence","chief operating officer","coo","vp operations","svp operations","executive director of operations"]))
    return "Segment 1";

  if (s(["general manager","multi unit","multi-unit","district manager","area director","area manager","regional manager","regional operations manager","area operations manager","area general manager","resident district manager","area coach","area leader"]))
    return "Segment 2";

  if (s(["executive chef","executive sous chef","corporate chef","corporate executive chef","culinary director","culinary manager","culinary systems","culinary operations","culinary partner","kitchen manager","executive kitchen manager","regional kitchen manager","regional chef","head chef","chef de cuisine","culinary development","culinary innovation","culinary lead","chief culinary"]))
    return "Segment 3";

  if (s(["director of restaurant technology","director of information technology","director of it","vp of technology","vice president of technology","vice president of information technology","chief information officer","cio","restaurant technology","restaurant systems","store systems","back office systems","point of sale manager","pos manager","it director","it manager","director of enterprise applications","director of information systems","technology director","senior director of it","senior manager restaurant technology"]))
    return "Segment 4";

  if (s(["chief executive","ceo","president","founder","co-founder","owner/operator","owner / operator","managing director","managing partner","managing owner","principal owner","business owner","owner/ceo","ceo/founder","ceo & owner"]))
    return "Segment 5";

  if (s(["franchise owner","franchisee","franchise business consultant","franchise director","franchise operations","franchise partner","multi-unit franchisee","master franchisor","area franchise"]))
    return "Segment 6";

  if (s(["retired","barista","bartender","server","delivery driver","cashier","line cook","real estate agent","realtor","tattoo","lawyer","attorney","doctor","nurse","teacher","professor","student","janitor","electrician","mechanic","musician","artist","photographer","life coach","fitness"]))
    return "Segment 7";

  return "Segment 8";
})(({{Job Title}} || "").toLowerCase())

// ────────────────────────────────────────────────────────────────────────────
