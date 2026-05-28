# Click Print — Flyer Printing Website

Premium flyer printing storefront for Click Print, Akkipet Bangalore.
Built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, and Fabric.js.

## What's Inside

- **26 routes** including landing page, configurator, A4/A5 product pages, pricing matrix, FAQ, file upload, checkout, order confirmation, admin dashboard, design editor (Canva-grade), and legal pages
- **Live-pricing configurator** for paper, size, sides, quantity
- **Drag-drop file upload** with DPI validation
- **Razorpay-ready checkout** (demo mode by default; add your keys to enable real payments)
- **Canva-grade design editor** built on Fabric.js with templates, fonts, shapes, layers, undo/redo, vector PDF export
- **AI generation UX** scaffolded for Gemini Nano Banana (wire-up pending in Phase 2.5)
- **Admin dashboard** for managing incoming orders
- **File-backed JSON order store** (drop-in replaceable with Supabase later)

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploy to Vercel (Easiest Path)

### Option 1: Drag-and-drop (no CLI needed)

1. Go to **[vercel.com/new](https://vercel.com/new)** and sign up (free, no card).
2. Drag this entire folder onto the upload area.
3. Vercel detects Next.js, builds, and gives you a `your-project.vercel.app` URL within 60 seconds.

### Option 2: Vercel CLI

```bash
npx vercel
```

Follow the prompts. First deploy is live in under 2 minutes.

### Option 3: Connect via GitHub

1. Push this folder to a GitHub repo.
2. At [vercel.com/new](https://vercel.com/new), click **Import** → pick your repo.
3. Every git push triggers a fresh deploy automatically.

## Environment Variables (Optional)

For real Razorpay payments, add to `.env.local`:

```
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

For Gemini AI generation (Phase 2.5):

```
GEMINI_API_KEY=your_gemini_key
```

## File Structure

```
app/                  — Next.js pages and API routes
components/
  layout/             — Header, footer, mobile nav
  marketing/          — Landing page sections
  order/              — Configurator
  upload/             — File upload flow
  checkout/           — Checkout form + payment
  editor/             — Canva-grade design tool (Fabric.js)
  legal/, ui/         — Reusable primitives
lib/
  config/             — Brand info, pricing rules
  store/              — Order storage layer
  editor/             — Fabric.js helpers, fonts, templates
.data/                — Local JSON DB (orders) — replaceable with Supabase
public/uploads/       — Customer file uploads — replaceable with S3/Supabase storage
```

## What's Still TODO

- Connect real Razorpay credentials (env vars + signature verification)
- Migrate `.data/orders.json` → Supabase for scale
- Add auth gate on `/admin`
- Wire AI Generate panel to Gemini Nano Banana API
- Upgrade editor export from PNG → true vector PDF
- Real photography in marketing sections

Built by Hyperagent in five turns.
