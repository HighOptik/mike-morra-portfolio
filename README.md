# Mike Morra — portfolio

Lead Unity developer site. UberLoop plays in-page via the itch.io HTML5 embed.

Live (GitHub Pages): https://highoptik.github.io/mike-morra-portfolio/

After any visitor-facing change, publish immediately:

```bash
npm run deploy
```

That builds with the GitHub Pages base path and pushes `dist` to `gh-pages`. Do not leave the live site behind the local files. GitHub may cache the HTML for about 10 minutes.

## Run locally

```bash
npm install
npm run dev
```

The embed URL lives in `src/data/site.ts` (`embedUrl`). If a new itch upload stops loading, update that ID from **Edit game → Embed**.
