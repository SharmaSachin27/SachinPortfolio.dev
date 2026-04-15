# Sachin Sharma Portfolio

A modern React portfolio built with Vite, TypeScript, Tailwind CSS, and Framer Motion. This repo includes a frontend portfolio site with sections for hero, about, expertise, projects, skills, and contact.

## Key features

- React + TypeScript frontend
- Tailwind CSS for responsive design
- Framer Motion animations
- Contact form with WhatsApp integration
- Portfolio sections for experience, skills, and projects
- Optional backend under `server/` for contact form/email processing

## Project structure

- `src/` — frontend source files
  - `components/` — React components
  - `pages/` — page layout components
  - `main.tsx` — app entrypoint
- `public/` — static assets (if used)
- `server/` — optional Express backend and API routes
- `index.html` — main HTML template
- `vite.config.ts` — Vite configuration

## Available scripts

- `npm run dev` — start the frontend dev server
- `npm run build` — build production assets
- `npm run preview` — preview production build locally
- `npm run lint` — run ESLint checks
- `npm test` — run Vitest tests

## Notes

- The contact form currently opens WhatsApp directly and can be configured with the WhatsApp number in `src/components/ContactSection.tsx`.
- If you do not need the backend, the `server/` folder can be removed safely because the frontend does not currently call `/api` endpoints.
- Update the meta tags in `index.html` to reflect your live domain and profile details.

## Getting started

1. Install dependencies

```bash
npm install
```

2. Start the development server

```bash
npm run dev
```

3. Open `http://localhost:5173` in your browser

