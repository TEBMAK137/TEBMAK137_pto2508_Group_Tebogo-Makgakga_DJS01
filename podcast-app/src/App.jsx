import React from "react";
import { PodcastProvider, usePodcast } from "./context/PodcastContext";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import SortSelect from "./components/SortSelect";
import GenreFilter from "./components/GenreFilter";
import PodcastGrid from "./components/PodcastGrid";
import Pagination from "./components/Pagination";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";
import styles from "./App.module.css";

/**
 * Loading state component.
 * @returns {JSX.Element}
 */
function LoadingStateFallback() {
  return <LoadingState />;
}

/**
 * Error state component.
 * @param {Object} props
 * @param {string} props.message - Error message.
 * @param {Function} props.onRetry - Retry callback.
 * @returns {JSX.Element}
 */
function ErrorStateFallback({ message, onRetry }) {
  return <ErrorState message={message} onRetry={onRetry} />;
}

/**
 * Main app content – uses podcast context and renders all features.
 * @returns {JSX.Element}
 */
function AppContent() {
  const {
    podcasts,
    totalPages,
    currentPage,
    setCurrentPage,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    selectedGenres,
    setSelectedGenres,
  } = usePodcast();

  if (loading) return <LoadingStateFallback />;
  if (error)
    return (
      <ErrorStateFallback
        message={error}
        onRetry={() => window.location.reload()}
      />
    );

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.controls}>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <SortSelect value={sortBy} onChange={setSortBy} />
      </div>
      <GenreFilter
        selectedGenres={selectedGenres}
        onChange={setSelectedGenres}
      />
      <PodcastGrid podcasts={podcasts} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

/**
 * Root App component – wraps the app with the podcast provider.
 * @returns {JSX.Element}
 */
export default function App() {
  return (
    <PodcastProvider>
      <AppContent />
    </PodcastProvider>
  );
}
