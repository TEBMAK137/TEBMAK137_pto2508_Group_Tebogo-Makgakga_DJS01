import React from "react";
import styles from "./EmptyState.module.css";

export default function EmptyState() {
  return (
    <div className={styles.container}>
      <p>No podcasts found</p>
      <p className={styles.sub}>Try adjusting your search or filters.</p>
    </div>
  );
}
