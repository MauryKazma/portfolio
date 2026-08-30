const WEAK = new Set([
  "di",
  "a",
  "da",
  "in",
  "con",
  "su",
  "per",
  "tra",
  "fra",
  "il",
  "lo",
  "la",
  "i",
  "gli",
  "le",
  "un",
  "una",
  "uno",
  "al",
  "allo",
  "alla",
  "ai",
  "agli",
  "alle",
  "del",
  "dello",
  "della",
  "dei",
  "degli",
  "delle",
  "nel",
  "nello",
  "nella",
  "nei",
  "negli",
  "nelle",
  "dal",
  "dallo",
  "dalla",
  "dai",
  "dagli",
  "dalle",
  "sul",
  "sullo",
  "sulla",
  "sui",
  "sugli",
  "sulle",
  "col",
  "coi",
  "e",
  "o",
  "ed",
  "che",
  "modo",
])

function wordCore(token) {
  return token.replace(/^[^\p{L}]+|[^\p{L}]+$/gu, "").toLowerCase()
}

/** Keep short Italian words with the next word so they never hang at the end of a line. */
export function glueItalianWrap(text) {
  if (typeof text !== "string" || !text) return text
  const parts = text.split(/(\s+)/)
  for (let i = 0; i < parts.length - 2; i += 1) {
    if (/^\s+$/.test(parts[i])) continue
    if (!WEAK.has(wordCore(parts[i]))) continue
    if (/^\s+$/.test(parts[i + 1])) parts[i + 1] = "\u00A0"
  }
  return parts.join("")
}
