# Lynx

Bibliothèque de techniques visuelles (inspirée d'eyecannndy.com). Site statique Astro.

## Contenu

- `src/content/techniques/*.md` : une fiche par technique (frontmatter : `name`, `category`, `summary`, `aliases`, `related`).
- `src/data/examples.json` : les extraits, rattachés à une ou plusieurs techniques par leur slug.
- Catégories autorisées : voir `CATEGORIES` dans `src/content.config.ts`.

## Médias

Les vidéos ne vont **pas** dans le repo. Encoder avec `scripts/encode.sh`, uploader sur un bucket (Cloudflare R2, Bunny…) et mettre l'URL dans `media` / `poster`. `public/media/` ne sert qu'aux tests locaux.

## Commandes

    npm run dev      # http://localhost:4321
    npm run build    # dist/
