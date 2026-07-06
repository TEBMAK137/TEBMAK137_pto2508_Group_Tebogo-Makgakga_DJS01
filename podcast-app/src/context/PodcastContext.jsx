import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { fetchAllPodcasts } from "../api/fetchPodcasts";
import { SORT_OPTIONS, ITEMS_PER_PAGE } from "../utils/constants";

/**
 * Podcast context object.
 * @type {React.Context}
 */
const PodcastContext = createContext(null);

/**
 * Provider component that manages all podcast state.
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components.
 * @returns {JSX.Element}
 */
export function PodcastProvider({ children }) {
  const [allPodcasts, setAllPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(SORT_OPTIONS.NEWEST);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch data on mount
  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        const data = await fetchAllPodcasts();
        if (mounted) setAllPodcasts(data);
      } catch (err) {
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  // Reset page when search/filter/sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy, selectedGenres]);

  // Filter, search, sort pipeline
  const processed = useMemo(() => {
    let result = [...allPodcasts];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(term));
    }

    if (selectedGenres.length) {
      result = result.filter((p) =>
        p.genreNames.some((g) => selectedGenres.includes(g)),
      );
    }

    switch (sortBy) {
      case SORT_OPTIONS.NEWEST:
        result.sort((a, b) => new Date(b.updated) - new Date(a.updated));
        break;
      case SORT_OPTIONS.TITLE_ASC:
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case SORT_OPTIONS.TITLE_DESC:
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }
    return result;
  }, [allPodcasts, searchTerm, sortBy, selectedGenres]);

  const totalPages = Math.ceil(processed.length / ITEMS_PER_PAGE);
  const paginated = processed.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const value = {
    podcasts: paginated,
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
  };

  return (
    <PodcastContext.Provider value={value}>{children}</PodcastContext.Provider>
  );
}

/**
 * Hook to access the podcast context.
 *
 * @returns {Object} Podcast state and setters.
 * @throws {Error} If used outside PodcastProvider.
 */
export function usePodcast() {
  const ctx = useContext(PodcastContext);
  if (!ctx) {
    throw new Error("usePodcast must be used within a PodcastProvider");
  }
  return ctx;
}
