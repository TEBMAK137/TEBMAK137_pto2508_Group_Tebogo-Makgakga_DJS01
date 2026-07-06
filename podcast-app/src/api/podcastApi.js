/**
 * API service for fetching and normalising podcast data.
 * @module podcastApi
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
 * Adds `genreNames` array.
 *
 * @param {Object} raw - Raw podcast data.
 * @returns {Object} Normalised podcast object.
 */
export function normalizePodcast(raw) {
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
 * Fetches all podcast previews.
 * @async
 * @returns {Promise<Array>} Array of normalised podcasts.
 * @throws {Error} If request fails.
 */
export async function fetchAllPodcasts() {
  const response = await fetch(API_BASE);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  return Array.isArray(data) ? data.map(normalizePodcast) : [];
}

/**
 * Fetches a single podcast show by ID (full details including seasons).
 * @async
 * @param {string} id - Podcast ID.
 * @returns {Promise<Object>} Full show data.
 */
export async function fetchShowById(id) {
  const response = await fetch(`${API_BASE}/id/${id}`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return await response.json();
}
