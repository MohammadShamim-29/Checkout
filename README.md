# pathao food concept — clearer checkout

An independent, mobile-first food-delivery concept focused on transparent pricing and a dedicated order review before checkout. The experience is fully clickable: discover restaurants, build a cart, apply a coupon, review every fee, place a simulated order, track its progress and revisit order history.

> Independent concept prototype — not affiliated with Pathao.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. The layout is designed for a `390 × 844` mobile viewport and also adapts to tablet and desktop.

## Production build

```bash
npm run build
npm run preview
```

The production output is generated in `dist/`. Preview it at `http://localhost:4173/Checkout/`.

## Demo flow

1. Open **Spice Route Kitchen** and add Chicken Biryani (`৳250`) and Beef Burger (`৳220`).
2. Review the cart: subtotal `৳470`, before discount `৳520`.
3. Apply coupon `SAVE20`: discount `৳20`, final total `৳500`.
4. Proceed to checkout and choose any simulated payment method.
5. Place the order, open tracking and advance through all five delivery stages.
6. Return to Orders or Profile; the order, cart and saved addresses persist after refresh.

Adding an item from a different restaurant while a cart is active opens the single-restaurant cart confirmation.

## Pricing rules

- Delivery fee: `৳40`
- Service charge: `৳10`
- Coupon: `SAVE20` gives `৳20` off orders with a `৳300` minimum subtotal
- One coupon at a time; totals are calculated in one place and never go below zero

## What is included

- Restaurant and dish discovery, category filters and search
- Item detail dialogs with quantity selection
- Single-restaurant cart with conflict handling
- Quantity controls, item removal and clear-cart confirmation
- Honest fee breakdown and coupon eligibility messaging
- Saved-address management with add and edit flows
- Simulated checkout validation and payment selection
- Order confirmation, manual tracking simulation and order history
- Responsive layouts, accessible dialogs, keyboard support and toast feedback
- All restaurant, dish and menu imagery stored locally in `public/images`

## Tech stack

- React 19 and TypeScript
- Vite
- React Router with hash-based URLs for reliable static hosting
- Lucide icons
- Manrope variable font via Fontsource
- Browser local storage under `pathao-food-concept-v1`

## Project structure

```text
src/
  components/   Shared UI, dialogs and order status components
  context/      App state, cart, persistence and toast notifications
  lib/          Formatting, pricing and local-storage helpers
  pages/        Route screens
  styles/       Split responsive stylesheet
  data.ts       Fictional restaurants, menus, addresses and constants
  types.ts      Shared TypeScript types
public/images/  Local restaurant and dish photography
```

## Publishing to GitHub Pages

This project is configured for a repository named `Checkout` and publishes to:

```text
https://<github-username>.github.io/Checkout/
```

1. Create a public GitHub repository named `Checkout`.
2. Push this project to the `main` branch:

```bash
git init
git add .
git commit -m "Build food delivery checkout concept"
git branch -M main
git remote add origin https://github.com/<github-username>/Checkout.git
git push -u origin main
```

3. In the repository, open **Settings → Pages → Build and deployment**, then set **Source** to **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` builds and deploys every push to `main`.

The app uses hash routing, so no rewrite rules are needed. If the repository is renamed, update `base` in `vite.config.ts` to match. For a custom domain served at the root, set `base` to `/`.

The build can also be hosted on Netlify, Vercel, Cloudflare Pages or any static web server by uploading `dist/`.

## Limitations

This is a product concept, not a production delivery platform. Payments, rider tracking, support, contacts and restaurant data are simulated. No real payment is processed, no precise location is requested and no personal data leaves the browser.
