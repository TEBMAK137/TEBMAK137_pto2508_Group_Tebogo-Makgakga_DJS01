/**
 * PodcastCard - A custom element that renders a podcast preview.
 * @class
 * @extends HTMLElement
 */
export class PodcastCard extends HTMLElement {
  constructor() {
    super();
    this._podcast = null;
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <style>
        :host { display: block; }
        .card {
          background: white;
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0,0,0,0.03), 0 1px 3px rgba(0,0,0,0.05);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          border: 1px solid #eef2f6;
          height: 100%;
        }
        .card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 30px -12px rgba(0,0,0,0.12);
          border-color: #d9cdf0;
        }
        .card-img {
          width: 100%;
          aspect-ratio: 1 / 1;
          object-fit: cover;
          background: #e2e8f0;
          display: block;
        }
        .card-content {
          padding: 1.2rem 1rem 1.3rem;
          flex: 1;
        }
        .card-title {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: #0f172a;
          line-height: 1.3;
        }
        .card-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin: 0.5rem 0;
          font-size: 0.7rem;
          font-weight: 600;
        }
        .badge {
          background: #f1f5f9;
          padding: 0.2rem 0.7rem;
          border-radius: 30px;
          color: #1e293b;
        }
        .seasons-badge {
          background: #ede9fe;
          color: #5b21b6;
        }
        .updated-text {
          font-size: 0.7rem;
          color: #64748b;
          margin-top: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        .genre-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin: 0.5rem 0 0.2rem;
        }
        .genre-tag {
          font-size: 0.7rem;
          background: #f1f1fe;
          padding: 0.2rem 0.7rem;
          border-radius: 30px;
          color: #4c1d95;
          font-weight: 500;
        }
      </style>
      <div class="card">
        <img class="card-img" alt="Podcast cover">
        <div class="card-content">
          <div class="card-title"></div>
          <div class="card-meta">
            <span class="badge seasons-badge seasons-count"></span>
          </div>
          <div class="genre-list"></div>
          <div class="updated-text">
            <span>🕒 Updated: <span class="updated-date"></span></span>
          </div>
        </div>
      </div>
    `;
    this._elements = {
      card: shadow.querySelector(".card"),
      img: shadow.querySelector(".card-img"),
      title: shadow.querySelector(".card-title"),
      seasonsSpan: shadow.querySelector(".seasons-count"),
      genreContainer: shadow.querySelector(".genre-list"),
      updatedDateSpan: shadow.querySelector(".updated-date"),
    };
    this._elements.card.addEventListener("click", () => {
      if (this._podcast) {
        this.dispatchEvent(
          new CustomEvent("podcast-selected", {
            detail: this._podcast,
            bubbles: true,
            composed: true,
          }),
        );
      }
    });
  }

  /**
   * Sets the podcast data and triggers rendering.
   * @param {Object} podcast - Podcast object with title, image, seasons, genreNames, updated.
   */
  setPodcast(podcast) {
    this._podcast = podcast;
    this._render();
  }

  /**
   * Escapes HTML special characters to prevent XSS.
   * @param {string} str - Input string.
   * @returns {string} Escaped string.
   * @private
   */
  _escapeHtml(str) {
    if (!str) return "";
    return str.replace(/[&<>]/g, (m) => {
      if (m === "&") return "&amp;";
      if (m === "<") return "&lt;";
      if (m === ">") return "&gt;";
      return m;
    });
  }

  /**
   * Formats an ISO date string into a human-readable format.
   * @param {string} isoDate - ISO date string.
   * @returns {string} Formatted date (e.g., "Jan 1, 2025").
   * @private
   */
  _formatDate(isoDate) {
    return new Date(isoDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  /**
   * Renders the podcast data into the Shadow DOM.
   * @private
   */
  _render() {
    if (!this._podcast) return;
    const { title, image, seasons, genreNames, updated } = this._podcast;
    this._elements.img.src = image;
    this._elements.img.alt = `${title} cover`;
    this._elements.title.textContent = title;
    this._elements.seasonsSpan.textContent = `📺 ${seasons} Season${seasons !== 1 ? "s" : ""}`;
    if (genreNames && genreNames.length) {
      this._elements.genreContainer.innerHTML = genreNames
        .map((g) => `<span class="genre-tag">${this._escapeHtml(g)}</span>`)
        .join("");
    } else {
      this._elements.genreContainer.innerHTML = "";
    }
    this._elements.updatedDateSpan.textContent = this._formatDate(updated);
  }
}

customElements.define("podcast-card", PodcastCard);
