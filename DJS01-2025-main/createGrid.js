/**
 * Creates a grid controller for rendering podcast cards.
 * @param {string} containerId - The ID of the container element.
 * @returns {Object} Grid controller with a render method.
 */
import "./PodcastCard.js";

export function createGrid(containerId) {
  const container = document.getElementById(containerId);
  if (!container)
    throw new Error(`Container with id "${containerId}" not found`);

  return {
    /**
     * Renders a list of podcasts into the grid.
     * @param {Object[]} podcastList - Array of podcast objects (must include genreNames).
     * @param {Function} onSelect - Callback invoked when a podcast is selected, receives the podcast object.
     */
    render(podcastList, onSelect) {
      container.innerHTML = "";
      podcastList.forEach((podcast) => {
        const card = document.createElement("podcast-card");
        card.setPodcast(podcast);
        card.addEventListener("podcast-selected", (e) => {
          if (onSelect) onSelect(e.detail);
        });
        container.appendChild(card);
      });
    },
  };
}
