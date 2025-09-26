type Options = { fallback?: string; singleWord?: boolean };

export function normalizeLabel(
  val: string | null | undefined,
  { fallback = "—", singleWord = false }: Options = {}
) {
  if (val == null) return fallback;

  const s = `${val}`.trim();
  if (!s) return fallback;

  if (s.toLowerCase() === "unknown") return "Unknown";

  if (singleWord && !/\s/.test(s)) {
    return s[0].toUpperCase() + s.slice(1).toLowerCase();
  }
  return s;
}
