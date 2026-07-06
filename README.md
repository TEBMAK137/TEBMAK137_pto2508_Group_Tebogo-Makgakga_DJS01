<<<<<<< HEAD
# DJS04 – React Podcast App with Search, Sort, Filter & Pagination

This project is a **React-based podcast browsing application** that allows users to explore podcasts using powerful features such as search, sort, filter by genre, and automatic pagination. It builds upon earlier solutions (DJS03) and introduces shared state management using the React Context API.

## Core Functionality

- **Fetch Podcasts from API**

  - Data is loaded from: `https://podcast-api.netlify.app/shows`
  - Podcasts include metadata like title, updated date, genres, image, and seasons

- **Search**

  - Users can search podcasts by title
  - Case-insensitive and dynamically updates the result list

- **Sort**

  - Sort options include:
    - Default
    - Newest (by updated date)
    - Oldest
    - Title A → Z
    - Title Z → A

- **Genre Filter**

  - Podcasts can be filtered by genre using a dropdown
  - All available genres are loaded from static data

- **Pagination**

  - The app dynamically adjusts how many podcast cards to show per page
  - Uses screen width to compute optimal layout (e.g., 2 rows × n columns)
  - Defaults to 10 items per page for tablet and smaller screens

- **Shared State with Context API**
  - Uses a `PodcastProvider` to manage global podcast state
  - Exposes search term, sort key, selected genre, page, and filtered podcasts
  - Components consume state via `usePodcasts()` or `PodcastContext`

## Project Structure

```
/src
│
├── /api
│ └── fetchPodcasts.js # Fetch podcasts from the API
│
├── /components
│ ├── Header.jsx # Top navigation bar with controls
│ ├── PodcastCard.jsx # Individual podcast preview card
│ ├── PodcastGrid.jsx # Grid layout of podcast cards
│
├── /context
│ └── PodcastContext.jsx # React context for global podcast state
│
├── /utils
│ └── formatDate.js # Formats ISO date to readable format
│
├── App.jsx # Root app component
└── main.jsx # React entry point
```

## How It Works

- When the app loads, it fetches all podcast data once.
- The data is passed into the `PodcastProvider`, which handles:
  - Searching titles
  - Sorting by selected key
  - Filtering by genre
  - Splitting into pages based on screen size
- Components like `PodcastGrid` display the processed data.

## How to Run

1. Clone the project or download the source code.
2. Install dependencies using:

   ```bash
   npm install
   ```

3. Run the development server with:

   ```bash
   npm run dev
   ```

4. Open http://localhost:5173 in your browser to view the app.
=======
# 🎙️ PodcastHub – React Podcast Discovery App

A fully responsive podcast landing page built with **React**. It fetches live data from a public podcast API, displays a grid of shows with cover images, titles, number of seasons, genre tags, and a human‑readable “last updated” date (e.g., *“3 days ago”*). The app handles loading, error, and empty states gracefully, and the layout adapts to mobile, tablet, and desktop screens.

---

## ✨ Features

- ✅ **Data fetching** – uses `fetch()` inside `useEffect` to load podcasts on mount  
- ✅ **Reusable components** – `PodcastCard`, `PodcastGrid`, loading / error / empty states  
- ✅ **Responsive grid** – CSS Grid with media queries (or Tailwind) – works from 375px to 4K  
- ✅ **Relative date formatting** – custom utility converts ISO dates to “2 days ago”, “3 weeks ago”, etc.  
- ✅ **Genre mapping** – internal `GENRE_MAP` converts API genre IDs into readable names  
- ✅ **Clean code** – modular architecture, JSDoc comments for every major function  
- ✅ **Two styling options** – choose between **plain CSS** (included) or **Tailwind CSS** (configurable)

---

## 🛠️ Tech Stack

- **React 18** (functional components, hooks)  
- **Vite** (fast build tool) – optional, but recommended  
- **CSS3** (Grid, Flexbox, custom properties) – no external framework in the plain CSS version  
- **Fetch API** (native) – no axios or other HTTP clients  

---

## 📁 Project Structure (Plain CSS version)


src/
├── api/
│ └── podcastApi.js # API calls + genre mapping + data normalisation
├── components/
│ ├── PodcastCard.jsx # Single preview card
│ ├── PodcastGrid.jsx # Responsive grid container
│ ├── LoadingState.jsx # Spinner and loading message
│ ├── ErrorState.jsx # Error display + retry button
│ └── EmptyState.jsx # Message when no podcasts are returned
├── utils/
│ └── dateFormatter.js # formatRelativeDate() – relative time strings
├── App.jsx # Root component – orchestrates data flow
├── index.css # All global styles (plain CSS with media queries)
└── main.jsx # React entry point
>>>>>>> 1ab8dd9a245eb6addb6da0bb42f2fdcd309db617
