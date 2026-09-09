# Backbeat Highway — Vercel-ready website

This is a dependency-free static site. No build step is required.

## Before launch

Open `site-config.js` and fill in:
- `bookingEmail`
- `bookingPhone` (optional)
- Instagram / Facebook / YouTube URLs (optional)
- final website URL (optional)

The booking form automatically creates a pre-filled email to the configured booking address. Until an email is configured, the “Copy request” button still works.

## Deploy to Vercel

### Option A — easiest
1. Put this folder in a GitHub repository.
2. In Vercel, choose **Add New → Project**.
3. Import the repository.
4. Framework preset: **Other**.
5. No build command is required.
6. Deploy.

### Option B — Vercel CLI
From this folder:

```bash
npx vercel
```

Then follow the prompts.

## Main files
- `index.html` — all site content
- `styles.css` — visual design and responsive layout
- `script.js` — navigation, animations, gallery lightbox, booking helper
- `site-config.js` — booking/social settings
- `assets/images/` — band/member imagery
- `assets/docs/Backbeat_Highway_EPK.pdf` — downloadable press kit

## Content notes
The site is built around the current Backbeat Highway positioning:

> Classic songs. Deep roots. Played like they still matter.

Member roles represented on the site:
- Mike Mancour — Lead & backup vocals, guitar, slide, harmonica, songwriter
- Chuck Vaughn — Lead & backup vocals, bass, guitar, producer/engineer
- Kyle Moon — Lead & backup vocals, keyboards, guitar, bass, harmonica
- Barney Evers — Backup vocals, bass, guitar, keyboards, flute, harmonica, songwriter
- Rick Mason — Drums, percussion

## Recommended next additions
- Booking email and phone
- Social links
- Two strong live performance videos
- Upcoming public dates
- Venue/customer testimonials
