import React from "react";
import { Routes, Route } from "react-router-dom";
import { PodcastProvider } from "./context/PodcastContext";
import Home from "./pages/Home";
import ShowDetail from "./pages/ShowDetail";

/**
 * Root App component – sets up routing and context provider.
 * @returns {JSX.Element}
 */
export default function App() {
  return (
    <PodcastProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/show/:id" element={<ShowDetail />} />
      </Routes>
    </PodcastProvider>
  );
}
