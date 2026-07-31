# i on GRC Portfolio

John Flack's public governance engineering portfolio.

The site brings together practical work across legacy-system controls, cyber risk quantification, evidence engineering, AI governance, and operational resilience.

## Design and behavior

- OLED dark is the default theme; visitors may opt into a paper-and-ink light theme.
- Theme preference is stored locally in the visitor's browser.
- The site uses semantic HTML, reduced-motion support, keyboard-visible controls, and responsive layouts.
- Social-sharing metadata uses `social-card.png`; the source artwork is retained in `social-card.svg`.

## Local preview

The portfolio is a dependency-free static site. From the repository root:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Deployment

Publish from the repository root with GitHub Pages. No build step is required.

The canonical production URL is <https://jtflack-grc.github.io/portfolio/>.
