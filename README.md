# Matter Website

Corporate website for Matter, built with [Next.js](https://nextjs.org/) 15 and [Contentful](https://www.contentful.com/) as a headless CMS. Deployed on [Vercel](https://vercel.com/).

## Tech Stack

- **Framework:** Next.js 15 (App Router, React 19)
- **CMS:** Contentful (Delivery API)
- **Email:** Resend
- **Analytics:** Vercel Web Analytics
- **Language:** TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- A Contentful space with the required content models (see below)
- A Resend API key for contact/apply form emails

### Setup

1. Clone the repo and install dependencies:

```bash
npm install
```

2. Copy the example env file and fill in your credentials:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `CONTENTFUL_SPACE_ID` | Your Contentful space ID |
| `CONTENTFUL_DELIVERY_TOKEN` | Contentful Content Delivery API token |
| `RESEND_API_KEY` | Resend API key for transactional emails |

3. Start the dev server:

```bash
npm run dev
```

## Contentful Content Models

### Page

Each route corresponds to a Page entry with a `slug` field:

| Slug | Route |
|---|---|
| `home` | `/` |
| `services` | `/services` |
| `apply` | `/apply` |
| `contact` | `/contact` |
| `privacy` | `/privacy` |
| `imprint` | `/imprint` |

Fields: `title`, `slug`, `metaDescription`, `headerImage`, `contentBlocks` (references).

### Content Block

Rich content section with optional image gallery. Fields: `heading`, `body` (rich text), `isHero`, `callToActionLabel`, `callToActionUrl`, `images`.

### Form Block

Renders a contact or apply form. Fields: `heading`, `formType` (`"contact"` or `"apply"`).

### Logo Carousel

Animated infinite-scroll carousel of client logos. Fields: `title`, `logos` (media array).

### Site Settings

Global settings (singleton). Fields: `siteName`, `logo`, `navigation` (page references), `notificationEmail`.

## Project Structure

```
src/
  app/                   # Next.js App Router pages
    api/                 # API routes (contact, apply form handlers)
    [slug]/page.tsx      # Route pages
    globals.css          # Global styles
    layout.tsx           # Root layout (header, footer)
  components/            # React components
    BlockRenderer.tsx    # Shared content block dispatcher
    LogoCarousel.tsx     # Animated client logo carousel
    LogoVideo.tsx        # Animated logo video (header)
    ...
  lib/
    contentful.ts        # Contentful API client (server-only)
    contentful-helpers.ts # Types, type guards, asset utilities
public/                  # Static assets (fonts, video)
scripts/                 # Setup scripts
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
