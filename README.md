# dp

Spiritlife 10th Anniversary display-picture generator built with **Next.js 16** and **Tailwind CSS**. Upload a photo, position your name, preview the commemorative artwork, then download a ready-to-share image.

## Tech stack

- Next.js 16 (App Router, React 19)
- Tailwind CSS 3.4 with custom palette
- lucide-react, react-dropzone, canvas compositing
- Vercel Analytics

## Local development

```bash
npm install
npm run dev
```

Visit http://localhost:3000 and start creating DPs.

## Production build

```bash
npm run build
npm start
```

## Deploying to Vercel

```bash
npm install -g vercel
vercel login
vercel --prod
```

The default project settings auto-detect the Next.js app and build using `npm run build`.
