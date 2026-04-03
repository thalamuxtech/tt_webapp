# Thalamux Tech — Web App

Premium landing site and admin portal for **Thalamux Tech** — the intelligent gateway delivering precision-driven solutions across Data, Analytics, Consultancy, AI, and Automation.

**Live:** [thalamux-tech.web.app](https://thalamux-tech.web.app)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router, Static Export) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion, tsparticles |
| Forms | React Hook Form + Zod |
| Backend | Firebase (Firestore, Auth, Analytics) |
| Hosting | Firebase Hosting |
| CI/CD | GitHub Actions → Firebase auto-deploy on push |

## Features

**Landing Page**
- Neural particle hero with animated gradient text
- Five Pillars service cards with hover effects
- How We Work process section
- Core Values glass-morphism cards
- Auto-scrolling trusted customers marquee
- Animated count-up trust metrics
- Service request form → Firestore
- Newsletter signup → Firestore
- Toast notification system (success/error/warning/info)
- Animated form success (checkmark + sparkles) and error states
- Mobile-first responsive (320px → 1920px)

**Admin Portal** (`/admin`)
- Firebase Auth (Email/Password + Google SSO)
- Real-time dashboard with stat cards and charts
- Service requests table with search, filter, status update, detail drawer, CSV export
- Newsletter signups table with bulk actions and CSV export
- Google Analytics integration link

## Getting Started

```bash
# Install
npm install

# Dev server
npm run dev

# Build
npm run build
```

Copy `.env.example` to `.env.local` and fill in Firebase config values.

## Deployment

Pushes to `main` auto-deploy to Firebase Hosting via GitHub Actions.

**Required GitHub Secrets:**
- `NEXT_PUBLIC_FIREBASE_*` (7 Firebase config vars)
- `FIREBASE_SERVICE_ACCOUNT` (service account JSON)

## Project Structure

```
app/           → Next.js pages (home, admin/login, admin/dashboard)
components/    → React components (NavBar, Hero, Pillars, Toast, etc.)
lib/           → Firebase config, auth context, motion variants, utils
public/        → Images, favicon, client logos
```

---

`Next.js` `TypeScript` `Tailwind CSS` `Firebase` `Framer Motion` `Zod` `React Hook Form`
