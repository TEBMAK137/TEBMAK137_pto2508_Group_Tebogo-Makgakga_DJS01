import React from "react";
import styles from "./LoadingState.module.css";

export default function LoadingState() {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      <p>Loading podcasts...</p>
    </div>
  );
}
