# Vici Embedded — company website

The public website for **Vici Embedded**, a technology and engineering company working across embedded
systems, software, cybersecurity and connected technologies.

> Engineering Technology. Building Possibilities.

Pages: **Home**, **About**, **Services**, **Products** and **Contact**, plus a 404 page.

## Tech stack

| Area | Tool |
| --- | --- |
| Framework | React 19 + TypeScript, built with Vite |
| Styling | Tailwind CSS 4, shadcn/ui components (Base UI primitives), Tabler icons |
| Fonts | Space Grotesk (headings), Geist (body) |
| Animation | Motion (`motion/react`), lazy-loaded |
| Forms | TanStack Form with Zod validation |
| Routing | A small built-in history router (`src/routes/router.tsx`) |

## Getting started

Requires Node.js 22 or newer (the test script uses Node's built-in TypeScript support).

```bash
npm install
cp .env.example .env   # then fill in the values, see below
npm run dev
```

The dev server prints a local URL (and a network URL, since it runs with `--host`).

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check and build for production into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run the TypeScript compiler without emitting |
| `npm run format` | Format `.ts`/`.tsx` files with Prettier |
| `npm test` | Run the contact-form schema self-check |

## Environment variables

| Variable | Purpose |
| --- | --- |
| `VITE_CONTACT_ENDPOINT` | URL the contact form POSTs enquiries to as JSON (e.g. a Formspree form or a serverless function). If unset, the form shows a "not connected yet" message and sends nothing. |

`.env` is git-ignored. Anything prefixed `VITE_` is bundled into the public JavaScript, so never put secrets there.

## Project structure

```
src/
├── App.tsx                 Route table (Contact is lazy-loaded)
├── main.tsx                App entry
├── index.css               Tailwind setup, fonts and the active colour theme import
├── themes/                 Colour themes (one is imported at a time)
├── assests/logo/           Logo image
├── components/
│   ├── ui/                 shadcn/ui components plus small shared pieces (ButtonLink, Reveal, StatusBadge)
│   ├── layout/             Header, footer, root layout, nav items
│   ├── sections/           Reusable page sections (Section, PageHero, CtaBand)
│   ├── home/               Home page sections (hero, schematic, expertise, approach, …)
│   ├── services/           Service detail block
│   ├── products/           Products empty state
│   ├── contact/            Contact form
│   └── brand/              Logo
├── content/services.ts     The six service areas, used by Home and Services
├── pages/                  One file per page; composes sections
├── routes/router.tsx       usePath, navigate and <Link>
├── schemas/                Zod schemas (contact form) and their self-check
└── lib/                    Helpers: motion presets, page metadata, cn
```

### Editing content

- **Service areas** (titles, descriptions, status labels) live in `src/content/services.ts`. Both the Home grid
  and the Services page read from it.
- **Navigation links** are in `src/components/layout/nav-items.ts`.
- **Page titles and meta descriptions** are set per page with `usePageMeta` at the top of each file in `src/pages/`.
- **Contact form fields and messages** are in `src/schemas/contact-schema.ts` (rules) and
  `src/components/contact/contact-form.tsx` (layout).

### Adding a page

1. Create `src/pages/<name>.tsx` and call `usePageMeta(title, description)`.
2. Add it to the `routes` table in `src/App.tsx`.
3. Add a link in `src/components/layout/nav-items.ts` if it belongs in the menu.

Use `Link` from `@/routes/router` for internal links so navigation stays client-side.

## Colour themes

The active theme is the single `@import "./themes/…css"` line in `src/index.css`.

| File | Palette |
| --- | --- |
| `emerald-charcoal.css` (active) | Emerald, Forest, Mint and Charcoal accents on Deep Navy and Off-white backgrounds |
| `blue-navy.css` | Original Electric Blue, Deep Navy and Electric Cyan |

To switch, change that import. To add a theme, copy one of the files and change the values.

Colour utility names keep their original role names: `navy` = dark surface, `navy-2` = raised dark surface,
`electric` = brand accent, `cyan` = bright accent on dark. Each theme file notes which colour pairings meet
WCAG AA contrast; keep to those when adding UI.

## Animation

Animations use Motion through `LazyMotion`, so the animation engine downloads separately after first paint.

- Use `m.div`, `m.li`, etc. from `motion/react`, **not** `motion.div`. `LazyMotion` runs in strict mode and
  throws if a full `motion.*` component is used, because that would undo the bundle saving.
- For a scroll-in reveal, wrap content in `<Reveal>` (`@/components/ui/reveal`) or spread `reveal(delay)` from
  `@/lib/motion` onto any `m.*` element.
- Reduced-motion settings are respected app-wide (`MotionConfig reducedMotion="user"`).

## shadcn/ui components

```bash
npx shadcn@latest add <component>
```

Components are added to `src/components/ui/`. Import them with `@/components/ui/<component>`.

## Contact form

- Validation rules live in `src/schemas/contact-schema.ts`. The schema has no UI imports, so a form backend can
  reuse it for server-side validation.
- Fields are validated on submit, then re-checked as the visitor types.
- A hidden honeypot field drops obvious bot submissions.
- The backend behind `VITE_CONTACT_ENDPOINT` must still validate input and rate-limit requests itself.

## Deployment

`npm run build` outputs a static site to `dist/`. Because routing happens in the browser, configure the host to
serve `index.html` for every path (SPA fallback), otherwise links like `/about` fail when opened directly.

- **Netlify:** add a `public/_redirects` file containing `/*  /index.html  200`
- **Vercel:** add a rewrite of `/(.*)` to `/index.html` in `vercel.json`
- **Nginx:** `try_files $uri /index.html;`

## Before launch

- [ ] Set `VITE_CONTACT_ENDPOINT` and send a test enquiry
- [ ] Confirm the privacy notice wording on the Contact page
- [ ] Confirm each service area's status label in `src/content/services.ts`
- [ ] Add verified contact details and social links (footer and Contact page)
- [ ] Add a sitemap and social sharing image once the domain is known
- [ ] Replace the products empty state when products are ready
