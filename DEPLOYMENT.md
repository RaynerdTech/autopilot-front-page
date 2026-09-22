# Production deployment

## 1. Verify locally

```powershell
npm install
npm run build
```

## 2. Push the site

The website repository is `https://github.com/RaynerdTech/autopilot-site`.

```powershell
git add .
git commit -m "Prepare Autopilot landing page for production"
git push origin main
```

## 3. Deploy with Vercel

1. In Vercel, choose **Add New → Project**.
2. Import `RaynerdTech/autopilot-site`.
3. Leave the framework as **Vite**, the build command as `npm run build`, and the output directory as `dist`.
4. Deploy. No environment variables are required for the production defaults.

Vercel will redeploy automatically after later pushes to `main`.

## Download source

All download buttons use the latest public release from `RaynerdTech/autopilot-downloads`:

- `Autopilot-Windows-x64.exe`
- `Autopilot-macOS-Apple-Silicon.dmg`
- `Autopilot-macOS-Intel.dmg`

Keep these exact asset names when publishing a new GitHub Release. The landing page will automatically point to the new latest release without another site change.

## Optional Vercel overrides

The values in `.env.example` can be added under **Project Settings → Environment Variables** when a repository, installer URL, or support email needs to change. They are optional for the current production setup.
