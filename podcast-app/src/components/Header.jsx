import React from "react";
import styles from "./Header.module.css";

/**
 * Header component displaying the app title and description.
 *
 * @component
 * @returns {JSX.Element}
 */
export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>🎙️ PodcastHub</h1>
      <p className={styles.subtitle}>
        Search, filter, sort, and paginate through hundreds of podcasts.
      </p>
    </header>
  );
}
