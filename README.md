# Xoli's LABS portfolio

A responsive, single-page portfolio for Xolile Ludidi built with Vite, React, TypeScript, Tailwind CSS, and Framer Motion.

## Run locally

```sh
npm install
npm run dev
```

Create a production build with `npm run build`; preview it with `npm run preview`.

## Update content and media

- Edit project, process, skill, reflection, contact, and image-gallery entries in `src/content.ts`.
- Place replacement image files under `public/assets/images`, then update their paths and descriptive alt text in `src/content.ts`.
- Replace `public/assets/logo-xolis-labs.svg` with the supplied vector logo when updating the brand artwork.
- The Namco and Inter fonts are self-hosted in `public/assets/fonts`.
- Replace each `[INSERT …]` contact placeholder in `src/content.ts` with a real email or URL. Email values become `mailto:` links; the website and profile links open in a new tab.
- Confirm the Campus Connect database and Gosselin coursework features in the relevant case-study cards before removing their confirmation labels.

## Deploy to GitHub Pages

Push the project to the `main` branch of a GitHub repository. The workflow in `.github/workflows/deploy.yml` builds the Vite app and publishes `dist` to GitHub Pages. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**. After the workflow succeeds, GitHub displays the public URL under Pages and in the deployment environment.

The Vite base path is relative, so the site also works when published beneath a repository path.
