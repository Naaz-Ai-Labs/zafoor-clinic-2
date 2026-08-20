# Zafoor Clinic Website

Official website for Zafoor Clinic — Dr. Mufeeda Roohi (Family Physician, Diabetologist and Aesthetic Physician), George Town, Chennai.

Skin, hair, laser, diabetes care and family medicine, built as a modern single-page site with smooth-scroll section navigation.

## Tech Stack
- **Framework:** Vite + React 19
- **Styling:** Plain CSS, component-scoped (no Tailwind)
- **Smooth scroll:** Lenis
- **Deployment:** Vercel
- **Contact form:** FormSubmit.co (no custom backend)

## Local Development

npm install
npm run dev

Opens at `http://localhost:5173`

## Build for Production

npm run build

Output goes to `dist/`

## Preview Production Build Locally

npm run preview


## Project Structure

src/
├── main.jsx # App entry point
├── App.jsx # Root component, assembles all sections
├── index.css # Design tokens (colors, spacing, typography, shared styles)
├── components/
│ ├── Navbar/
│ ├── Hero/
│ ├── DoctorBanner/
│ ├── About/
│ ├── Services/
│ ├── VideoSection/
│ ├── Gallery/
│ ├── Reviews/
│ ├── FAQ/
│ ├── ContactForm/
│ ├── Footer/
│ └── WhatsAppWidget/
├── data/
│ └── content.js # All site copy/content in one place
└── hooks/
├── useLenis.js # Smooth scroll + anchor-link handling
└── useInView.js # Scroll-triggered reveal animations

public/
├── images/ # Gallery, hero, before/after photos
├── videos/ # Procedure walkthroughs, video reviews
└── logo/


## Design System
- **Color palette:** Gold family (champagne, muted gold, gold-taupe) — tokens defined in `src/index.css` under `:root`
- **Typography:** Cormorant Garamond (headings) + Inter (body)
- **Buttons:** Pill-shaped (`--radius-pill`), cards/panels sharp-cornered (`--radius`)
- **Animations:** Scroll-triggered fade/slide-in via `useInView`, respects `prefers-reduced-motion`

## Deployment
Connected to Vercel 