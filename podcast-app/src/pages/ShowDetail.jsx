import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchShowById } from "../api/podcastApi";
import { GENRE_MAP } from "../api/podcastApi";
import { formatRelativeDate } from "../utils/formatDate";
import styles from "./ShowDetail.module.css";

/**
 * ShowDetail page – displays full podcast info and seasons/episodes.
 * @returns {JSX.Element}
 */
export default function ShowDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function loadShow() {
      try {
        setLoading(true);
        const data = await fetchShowById(id);
        if (mounted) setShow(data);
      } catch (err) {
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadShow();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading show details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>⚠️ {error}</p>
        <button onClick={() => navigate("/")} className={styles.backBtn}>
          ← Back to Home
        </button>
      </div>
    );
  }

  if (!show) {
    return (
      <div className={styles.error}>
        <p>Show not found.</p>
        <button onClick={() => navigate("/")} className={styles.backBtn}>
          ← Back to Home
        </button>
      </div>
    );
  }

  const genreNames = show.genres
    ? show.genres.map((id) => GENRE_MAP[id] || "Unknown")
    : [];

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backLink}>
        ← Back to all shows
      </Link>

      <div className={styles.hero}>
        <img src={show.image} alt={show.title} className={styles.cover} />
        <div className={styles.info}>
          <h1>{show.title}</h1>
          <div className={styles.meta}>
            <span className={styles.badge}>
              ⭐ {show.seasons} Season{show.seasons !== 1 ? "s" : ""}
            </span>
            <span className={styles.badge}>
              🕒 Updated {formatRelativeDate(show.updated)}
            </span>
          </div>
          <div className={styles.genres}>
            {genreNames.map((g) => (
              <span key={g} className={styles.genreTag}>
                {g}
              </span>
            ))}
          </div>
          <p className={styles.description}>{show.description}</p>
        </div>
      </div>

      <div className={styles.seasons}>
        <h2>📅 Seasons & Episodes</h2>
        {show.seasons && show.seasons.length > 0 ? (
          <div className={styles.seasonList}>
            {show.seasons.map((season, idx) => (
              <div key={season.id || idx} className={styles.seasonCard}>
                <h3>{season.title || `Season ${idx + 1}`}</h3>
                <p>{season.episodes ? season.episodes.length : 0} episodes</p>
                {season.episodes && season.episodes.length > 0 ? (
                  <ul className={styles.episodeList}>
                    {season.episodes.map((ep, i) => (
                      <li key={ep.id || i} className={styles.episodeItem}>
                        <span className={styles.episodeTitle}>
                          {ep.title || `Episode ${i + 1}`}
                        </span>
                        <span className={styles.episodeDuration}>
                          {ep.duration || "—"}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className={styles.noEpisodes}>No episodes listed.</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No season details available.</p>
        )}
      </div>
    </div>
  );
}
