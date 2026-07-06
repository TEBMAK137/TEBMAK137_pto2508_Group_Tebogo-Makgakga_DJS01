# PodcastHub – Advanced Podcast Discovery

A feature‑rich React app with live search, genre filtering, sorting, and pagination.  
Data is fetched from `https://podcast-api.netlify.app`.

## Features

- 🔍 **Live search** – partial title match
- 🎛️ **Multi‑select genre filter**
- 📅 **Sorting** – newest, title A–Z, title Z–A
- 📄 **Pagination** – 12 items per page
- 📱 **Fully responsive** – mobile, tablet, desktop
- 🧠 **Centralised state** – React Context
- 🎨 **CSS Modules** – scoped, maintainable styles

## Setup

```bash
npm install
npm run dev
```

DJS04-SOLUTION-.../
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── vite.config.js
└── src/
├── api/
│ └── fetchPodcasts.js
├── components/
│ ├── GenreFilter.jsx
│ ├── GenreFilter.module.css
│ ├── Header.jsx
│ ├── Header.module.css
│ ├── Pagination.jsx
│ ├── Pagination.module.css
│ ├── PodcastCard.jsx
│ ├── PodcastCard.module.css
│ ├── PodcastGrid.jsx
│ ├── PodcastGrid.module.css
│ ├── SearchBar.jsx
│ ├── SearchBar.module.css
│ ├── SortSelect.jsx
│ └── SortSelect.module.css
├── context/
│ └── PodcastContext.jsx
├── utils/
│ ├── constants.js
│ └── formatDate.js
├── App.jsx
├── App.module.css
├── data.js
├── index.css
└── main.jsx
