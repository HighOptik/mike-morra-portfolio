# Mike Morra — portfolio

Lead Unity developer site. Hosts playable WebGL (Three.js now; Unity builds drop in).

## Run locally

```bash
npm install
npm run dev
```

## Host a Unity WebGL build

1. In Unity: **File → Build Profiles → WebGL**.
2. Player Settings: **Compression Format = Disabled** (simplest) or Gzip/Brotli if your host will send `Content-Encoding`.
3. Copy the export into `public/webgl/<slug>/` so you have:

```
public/webgl/uberloop/
  Build/
    UberLoop.loader.js
    UberLoop.framework.js
    UberLoop.data
    UberLoop.wasm
  StreamingAssets/   (if Unity created it)
  manifest.json
```

4. `manifest.json` (paths relative to that folder):

```json
{
  "loaderUrl": "Build/UberLoop.loader.js",
  "dataUrl": "Build/UberLoop.data",
  "frameworkUrl": "Build/UberLoop.framework.js",
  "codeUrl": "Build/UberLoop.wasm",
  "streamingAssetsUrl": "StreamingAssets",
  "companyName": "SooperType",
  "productName": "UberLoop",
  "productVersion": "0.1.0"
}
```

5. Add a project in `src/data/site.ts` with `playable: true` and `webgl: "unity"` if it is a new slug.

Unity binaries are gitignored (they are large). Keep them on disk when you `npm run build`, then deploy the `dist` folder, or use Git LFS.

## Deploy

Static host: Cloudflare Pages, Netlify, or Vercel. `_headers`, `netlify.toml`, and `vercel.json` already set WASM MIME type and isolation headers for `/webgl` and `/play`.
