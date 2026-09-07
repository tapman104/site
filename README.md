# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## Cloudflare Pages Deployment

This project is configured for Cloudflare Pages with SPA client routing (`_redirects`), security & caching rules (`_headers`), and Wrangler settings (`wrangler.jsonc`).

### Option 1: Direct Git Integration (Recommended)
1. In Cloudflare Dashboard, go to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
2. Select this repository.
3. Configure build settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Click **Save and Deploy**.

### Option 2: Wrangler CLI
```bash
# Preview locally with Wrangler
npm run preview:cf

# Deploy to Cloudflare Pages
npm run deploy:cf
```

### Option 3: GitHub Actions
A GitHub Actions workflow is provided at `.github/workflows/cloudflare-pages.yml`. To enable automated deployments:
1. In your GitHub repository settings, add secrets:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
2. Pushes to `main` will automatically build and deploy.

