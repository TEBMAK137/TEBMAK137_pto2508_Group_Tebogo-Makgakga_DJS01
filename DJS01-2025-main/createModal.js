import { seasons } from "./data.js";

/**
 * Creates a modal controller for displaying podcast details.
 * Expects DOM elements with ids: modalOverlay, modalContent, closeModalBtn.
 * @returns {Object} Modal controller with open(podcast) and close() methods.
 */
export function createModal() {
  const overlay = document.getElementById("modalOverlay");
  const contentContainer = document.getElementById("modalContent");
  const closeBtn = document.getElementById("closeModalBtn");

  if (!overlay || !contentContainer || !closeBtn) {
    throw new Error(
      "Modal elements missing: ensure modalOverlay, modalContent, closeModalBtn exist.",
    );
  }

  /**
   * Escapes HTML special characters.
   * @param {string} str - Input string.
   * @returns {string} Escaped string.
   */
  function escapeHtml(str) {
    if (!str) return "";
    return str.replace(/[&<>]/g, (m) => {
      if (m === "&") return "&amp;";
      if (m === "<") return "&lt;";
      if (m === ">") return "&gt;";
      return m;
    });
  }

  /**
   * Formats an ISO date string.
   * @param {string} isoDate - ISO date.
   * @returns {string} Formatted date.
   */
  function formatDate(isoDate) {
    return new Date(isoDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  /**
   * Builds the HTML content for the modal.
   * @param {Object} podcast - Podcast object with full details.
   * @returns {string} HTML string.
   */
  function buildModalContent(podcast) {
    const updatedHuman = formatDate(podcast.updated);
    const genreTags = (podcast.genreNames || [])
      .map(
        (g) =>
          `<span class="genre-tag" style="background:#ede9fe;">${escapeHtml(g)}</span>`,
      )
      .join("");
    const seasonData =
      seasons.find((s) => s.id === podcast.id)?.seasonDetails || [];
    let seasonsHtml = `<div class="season-list"><h4 style="margin-bottom: 0.8rem;">📅 Seasons & Episodes</h4>`;
    if (seasonData.length) {
      seasonData.forEach((season) => {
        seasonsHtml += `
          <div class="season-item">
            <span class="season-name">🎧 ${escapeHtml(season.title)}</span>
            <span class="season-episodes">${season.episodes} episodes</span>
          </div>
        `;
      });
    } else {
      seasonsHtml += `<p>Season details coming soon.</p>`;
    }
    seasonsHtml += `</div>`;

    return `
      <div class="modal-header">
        <img class="modal-cover" src="${podcast.image}" alt="${escapeHtml(podcast.title)} cover">
        <div class="modal-title-section">
          <div class="modal-title">${escapeHtml(podcast.title)}</div>
          <div class="meta-detail-row">
            <span class="badge seasons-badge">⭐ ${podcast.seasons} Seasons</span>
            <span class="badge">📅 Updated: ${updatedHuman}</span>
          </div>
          <div class="genre-list" style="margin-top: 0.4rem;">${genreTags}</div>
        </div>
      </div>
      <div class="modal-description">
        <strong>📖 About the show</strong><br>${escapeHtml(podcast.description)}
      </div>
      ${seasonsHtml}
    `;
  }

  /**
   * Closes the modal.
   */
  function close() {
    overlay.classList.remove("active");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  /**
   * Opens the modal with podcast details.
   * @param {Object} podcast - Podcast object.
   */
  function open(podcast) {
    contentContainer.innerHTML = buildModalContent(podcast);
    overlay.classList.add("active");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("active")) close();
  });

  return { open, close };
}
