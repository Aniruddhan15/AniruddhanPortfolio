# AniruddhanPortfolio

Personal portfolio built with React and Vite.

## Local development

```bash
npm install
npm run dev
```

Production builds are written to `dist/`.

## GitHub Pages deployment

After pushing:

1. Open the GitHub repository: `Aniruddhan15/AniruddhanPortfolio`.
2. Go to **Settings -> Pages**.
3. Under **Build and deployment**, choose **GitHub Actions**.
4. Push to the `main` branch.
5. Wait for the deployment workflow to complete.

The expected site URL is [https://aniruddhan15.github.io/AniruddhanPortfolio/](https://aniruddhan15.github.io/AniruddhanPortfolio/).

The workflow in `.github/workflows/deploy.yml` builds `dist/` and deploys it using the official GitHub Pages actions. Vite uses `/AniruddhanPortfolio/` as its GitHub Pages base path.

## Vercel deployment

Use the same repository with these settings:

- Framework preset: `Vite`
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`

When Vercel sets `VERCEL`, Vite switches its base path to `/`, so the same build works on both hosts.
