# Mike Morra — portfolio

Lead Unity developer site. UberLoop plays in-page via the itch.io HTML5 embed.

Live (GitHub Pages): https://highoptik.github.io/mike-morra-portfolio/

Pushes to `main` do not auto-deploy. After a change you want live:

```bash
npm run build
```

Then publish the `dist` folder to the `gh-pages` branch. GitHub Pages is free for this public repo.

## Run locally

```bash
npm install
npm run dev
```

The embed URL lives in `src/data/site.ts` (`embedUrl`). If a new itch upload stops loading, update that ID from **Edit game → Embed**.
