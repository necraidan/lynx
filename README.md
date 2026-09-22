# Lynx

Bibliothèque de techniques visuelles (inspirée d'eyecannndy.com). Site statique Astro.

## Contenu

- `src/content/techniques/*.md` : une fiche par technique (frontmatter : `name`, `category`, `summary`, `aliases`, `related`).
- `src/data/examples.json` : les extraits, rattachés à une ou plusieurs techniques par leur slug.
- Catégories autorisées : voir `CATEGORIES` dans `src/content.config.ts`.

## Médias

Les vidéos ne vont **pas** dans le repo. Encoder avec `scripts/encode.sh`, uploader sur un bucket (Cloudflare R2, Bunny…) et mettre l'URL dans `media` / `poster`. `public/media/` ne sert qu'aux tests locaux.

### Piste : Cloudflare R2

Choix retenu pour plus tard (egress gratuit, compatible S3, CDN natif).

1. Créer un bucket R2 dans le dashboard Cloudflare, lui attacher un domaine personnalisé (ex. `media.lynx.example`).
2. Encoder les extraits : `scripts/encode.sh source.mov out/nom [start]` produit `nom.mp4` + `nom.jpg`.
3. Uploader avec `rclone` ou `wrangler r2 object put`.
4. Dans `src/data/examples.json`, renseigner `media` et `poster` avec les URL du domaine.

Aucun changement de code nécessaire : le composant `Clip` accepte indifféremment un chemin local ou une URL absolue.

Alternatives étudiées : Bunny (lecteur et vignettes automatiques, egress payant mais minime), Backblaze B2 (stockage le moins cher, à coupler à Cloudflare), Mux / Cloudflare Stream (facturation à la minute, surdimensionné pour des clips courts).

## Commandes

    npm run dev      # http://localhost:4321
    npm run build    # dist/
