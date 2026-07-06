import React from "react";
import PodcastCard from "./PodcastCard";
import styles from "./PodcastGrid.module.css";

/**
 * Responsive grid of podcast cards.
 *
 * @component
 * @param {Object} props
 * @param {Array<Object>} props.podcasts - Array of normalised podcast objects.
 * @returns {JSX.Element}
 */
export default function PodcastGrid({ podcasts }) {
  if (!podcasts.length) {
    return <div className={styles.empty}>No podcasts match your criteria.</div>;
  }
  return (
    <div className={styles.grid}>
      {podcasts.map((podcast) => (
        <PodcastCard key={podcast.id} podcast={podcast} />
      ))}
    </div>
  );
}
