import React from "react";
import styles from "./ErrorState.module.css";

export default function ErrorState({ message, onRetry }) {
  return (
    <div className={styles.container}>
      <p className={styles.title}>⚠️ Something went wrong</p>
      <p className={styles.message}>{message}</p>
      <button onClick={onRetry} className={styles.button}>
        Try again
      </button>
    </div>
  );
}
