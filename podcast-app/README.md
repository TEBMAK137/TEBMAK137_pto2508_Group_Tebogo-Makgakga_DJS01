# PodcastHub – DJS05 (React with Routing)

A React podcast discovery app with client‑side routing, global state, search, filter, sort, pagination, and a detailed show view.

## Features

- 🏠 **Homepage** – list podcasts with live search, genre filter, sorting, and pagination.
- 🎙️ **Detail page** – full show info, seasons, and episodes.
- 🌐 **React Router** – navigation between pages without reload.
- 🧠 **PodcastContext** – shared state for podcasts, filters, and pagination.
- 📱 **Responsive** – works on mobile, tablet, desktop.

## Setup

`bash`
npm install
npm run dev

DJS05-solution/
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── vite.config.js
└── src/
├── api/
│ └── podcastApi.js
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
├── pages/
│ ├── Home.jsx
│ ├── Home.module.css
│ ├── ShowDetail.jsx
│ └── ShowDetail.module.css
├── utils/
│ ├── constants.js
│ └── formatDate.js
├── App.jsx
├── data.js
├── index.css
└── main.jsx
