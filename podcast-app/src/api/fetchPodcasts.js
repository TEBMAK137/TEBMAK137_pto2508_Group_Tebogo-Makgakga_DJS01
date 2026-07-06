/**
 * API service for fetching and normalising podcast data.
 * @module fetchPodcasts
 */

import { genres } from "../data.js";

const API_BASE = "https://podcast-api.netlify.app";

/**
 * Genre ID to title mapping (built from data.js).
 * @constant {Object<number, string>}
 */
export const GENRE_MAP = Object.fromEntries(genres.map((g) => [g.id, g.title]));

/**
 * Normalises a raw podcast object from the API.
 * Adds `genreNames` array by mapping genre IDs to titles.
 *
 * @param {Object} raw - Raw podcast data.
 * @param {string} raw.id - Unique identifier.
 * @param {string} raw.title - Podcast title.
 * @param {string} raw.description - Show description.
 * @param {number} raw.seasons - Number of seasons.
 * @param {string} raw.image - Cover image URL.
 * @param {string} raw.updated - ISO date string.
 * @param {number[]} raw.genreIds - Array of genre IDs (may be named `genres`).
 * @returns {Object} Normalised podcast object with `genreNames` array.
 */
function normalizePodcast(raw) {
  const genreIds = raw.genreIds ?? raw.genres ?? [];
  return {
    id: String(raw.id),
    title: raw.title,
    description: raw.description,
    seasons: raw.seasons,
    image: raw.image,
    updated: raw.updated,
    genreIds,
    genreNames: genreIds.map((id) => GENRE_MAP[id] || "Unknown"),
  };
}

/**
 * Fetches all podcast previews from the public API.
 *
 * @async
 * @returns {Promise<Array<Object>>} Array of normalised podcast objects.
 * @throws {Error} If the network request fails or returns a non‑200 status.
 *
 * @example
 * const podcasts = await fetchAllPodcasts();
 * console.log(podcasts[0].title);
 */
export async function fetchAllPodcasts() {
  const response = await fetch(API_BASE);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return Array.isArray(data) ? data.map(normalizePodcast) : [];
}
