# Richard Beukes - Consulting Portfolio

Static single-page portfolio site. No build step required.

## Local Preview

Open `index.html` in a browser, or serve with any static server:

```bash
npx serve .
```

## Deploy to Vercel

1. Push this folder to a Git repository.
2. Import the repo at https://vercel.com/new.
3. Framework Preset: **Other** (no framework).
4. Output Directory: `.` (root).
5. Deploy.

## Deploy to Cloudflare Pages

1. Push to Git.
2. Go to https://dash.cloudflare.com > Pages > Create a project.
3. Connect your repo.
4. Build command: leave empty.
5. Build output directory: `.` (root).
6. Deploy.

## Files

- `index.html` - Full site markup
- `style.css` - All styles
- `script.js` - Mobile menu, scroll reveal, nav effects

## Contact Form

Currently uses `mailto:`. To enable a proper form backend, replace the form action with a Formspree endpoint:

```html
<form action="https://formspree.io/f/YOUR_ID" method="POST">
```
