# Fausto Saccoccio - Portfolio (2026 Update)

Welcome to the repository for my personal portfolio. 

## V2 - React / Vite Migration
The current active iteration of the portfolio is located in the `v2/` directory. It was rebuilt in 2026 using:
- **React 19**
- **TypeScript**
- **Vite**
- **Tailwind CSS v4** (Glassmorphism & deep dark aesthetics)

### Local Development
To run the portfolio locally:
1. Navigate to the `v2` directory: `cd v2`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`

### Deployment
The project is configured for free hosting on GitHub Pages. To deploy updates:
1. Make your changes inside `v2/src/`.
2. Commit your changes.
3. Run `npm run deploy` from the `v2` directory.

The deploy script automatically builds the React app into the `dist` folder and pushes it to the `gh-pages` branch. The live site reflects at `https://FaustoS88.github.io/portfolio/`.

## Legacy (V1)
The root directory contains the original `index.html` and `style.css` files from the first iteration of the portfolio (Tailwind via CDN). They are preserved here for reference but the active project is now `v2`.
