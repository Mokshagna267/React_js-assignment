# React Assignments

This repository contains two independent React applications built with Vite:

1. **Chat App** — a simple team chat interface with message submission and per-message likes.
2. **Photo Gallery** — a photo feed with author names, per-photo likes, and automatic loading of additional images.

## Requirements

- Node.js 18 or newer
- npm
- Internet connection for the Photo Gallery (it retrieves images from the Picsum API)

## Project structure

```text
react-assignment-solutions/
├── chat-app/
│   ├── index.html
│   ├── package.json
│   └── src/
│       ├── main.jsx
│       ├── ChatApp.jsx
│       └── styles.css
├── photo-gallery/
│   ├── index.html
│   ├── package.json
│   └── src/
│       ├── main.jsx
│       ├── PhotoGallery.jsx
│       └── styles.css
├── .gitignore
└── README.md
```

## Run the Chat App

Open a terminal in the `chat-app` folder and run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in your browser.

### Chat App features

- Submit messages using the Send button or Enter key.
- Assign a sender name from Alan, Bob, Carol, Dean, or Elin.
- Display messages in the chat thread.
- Like individual messages and update their like counts.
- Ignore empty messages.

## Run the Photo Gallery

Open a separate terminal in the `photo-gallery` folder and run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in your browser.

### Photo Gallery features

- Retrieve photo data from `https://picsum.photos/v2/list?page=N`.
- Display each photo with its author name.
- Like individual photos.
- Load more photos automatically while scrolling using `IntersectionObserver`.
- Show loading and error states, with a retry option.

## Production build check

Run this inside each project folder:

```bash
npm install
npm run build
```

Vite writes the production build to that project's `dist/` folder. The `dist/` and `node_modules/` folders are intentionally excluded from Git by `.gitignore`.

## Notes

- The Chat App and Photo Gallery are separate Vite projects and should be installed and started independently.
- Vite may choose a different localhost port if its default port is already in use.
- The Photo Gallery requires internet access to retrieve images from Picsum.
