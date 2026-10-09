# Standalone relay pages

This branch builds independent static pages for the US and EU relay servers;
it adds no routes to the marketing site and is not approved for deployment.

- `bun run relays:dev`: local development at port 4174; use `/?region=eu` for Europe.
- `bun run relays:build`: prerender both regions and create ZIPs in `output/relays/`.
- Preview each ZIP's `public/` directory through a static HTTP server, not `file://`.

`RelayPage.svelte` shares the site's fonts, tokens, CSS, primitives, page introduction
and theme controller. The standalone header contains the logo and theme control.
The content-width connection panel reverses the page's ink/paper colors in each
theme, including its labeled copy action. A muted panel
separates relay capabilities from event kinds. The full-width muted footer contains
operator/source information and a button linking to the White Noise website.
The relay pages do not use the marketing navigation or closing section. Links to
the website use absolute URLs; no links back are added to the website. No relay connections are made
by the page. Static capability/version copy must be checked against the deployed
relay when preparing future handoffs. Deployment instructions are bundled from
`scripts/relays/deployment.txt`; the developer must preserve existing request routing.
