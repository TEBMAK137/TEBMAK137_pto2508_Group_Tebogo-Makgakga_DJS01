/**
 * Date formatting utilities.
 * @module formatDate
 */

/**
 * Returns a human‑readable relative time string.
 * For dates older than 1 year, returns the full date (e.g., "Nov 3, 2022").
 * For more recent dates, returns a relative string (e.g., "2 days ago").
 *
 * @param {string} isoDate - ISO 8601 date string.
 * @returns {string} Formatted date string.
 *
 * @example
 * formatRelativeDate("2022-11-03T07:00:00.000Z") // "Nov 3, 2022"
 * formatRelativeDate("2026-06-15T10:00:00.000Z") // "2 days ago"
 */
export function formatRelativeDate(isoDate) {
  const date = new Date(isoDate);
  if (isNaN(date.getTime())) return "Unknown date";

  const now = new Date();
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

  // For dates older than 1 year, show the full date
  if (diffDays > 365) {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  // For recent dates, show relative time
  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 7) return `${diffDays} days ago`;
  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks === 1) return "1 week ago";
  if (diffWeeks < 5) return `${diffWeeks} weeks ago`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths === 1) return "1 month ago";
  if (diffMonths < 12) return `${diffMonths} months ago`;

  // Fallback: show full date (should not be reached for >1 year)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
