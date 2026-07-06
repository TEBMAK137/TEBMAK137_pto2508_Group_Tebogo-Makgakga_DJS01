import React from "react";
import { usePodcast } from "../context/PodcastContext";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SortSelect from "../components/SortSelect";
import GenreFilter from "../components/GenreFilter";
import PodcastGrid from "../components/PodcastGrid";
import Pagination from "../components/Pagination";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import styles from "./Home.module.css";

/**
 * Home page – lists all podcasts with search, filter, sort, pagination.
 * @returns {JSX.Element}
 */
export default function Home() {
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

  if (loading) return <LoadingState />;
  if (error)
    return (
      <ErrorState message={error} onRetry={() => window.location.reload()} />
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
