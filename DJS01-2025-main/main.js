// main.js
import { podcasts, genres } from "./data.js";
import { createGrid } from "./createGrid.js";
import { createModal } from "./createModal.js";

// Enrich podcasts with genre names
const podcastsWithGenres = podcasts.map((p) => ({
  ...p,
  genreNames: p.genres.map(
    (gid) => genres.find((g) => g.id === gid)?.title || "Unknown",
  ),
}));

document.addEventListener("DOMContentLoaded", () => {
  const grid = createGrid("podcastGrid");
  const modal = createModal();

  grid.render(podcastsWithGenres, (selectedPodcast) => {
    modal.open(selectedPodcast);
  });
});
