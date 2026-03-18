/**
 * Shared DOI normalization utility
 * Used by BatchMatcher and BlacklistManagers for consistent DOI handling
 */

/**
 * Normalize DOI to standard format
 * Removes URL prefixes, lowercases, and validates format
 * @param doi The DOI to normalize
 * @returns Normalized DOI or null if invalid
 */
export function normalizeDoi(doi: string | null | undefined): string | null {
  if (!doi) return null;

  let normalized = String(doi).trim().toLowerCase();

  // Remove common URL prefixes
  normalized = normalized.replace(/^https?:\/\/(dx\.)?doi\.org\//i, "");
  normalized = normalized.replace(/^doi:\s*/i, "");
  normalized = normalized.replace(/\/+/g, "/"); // Collapse multiple slashes
  normalized = normalized.trim();

  // Validate DOI format
  if (!normalized.startsWith("10.")) {
    return null;
  }

  return normalized;
}
