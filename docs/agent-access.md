# Agent access

White Noise's website publishes public information and connector setup guides. It does not host a messaging API, OAuth issuer, MCP server, or A2A agent. Connectors run in the user's own environment.

## Reading and discovery

- HTML remains the default. A GET or HEAD request with an explicit, preferred `Accept: text/markdown` receives readable Markdown from the same rendered page content. Quality values are honored; wildcards alone do not select Markdown. Responses vary on `Accept`. No model-specific token count is claimed.
- `/.well-known/agent-skills/index.json` follows the [Agent Skills Discovery v0.2 draft](https://github.com/cloudflare/agent-skills-discovery-rfc). Its setup skill is generated from the existing Agents guide, including its installation approval requirements. The index digest covers the exact UTF-8 artifact bytes.
- `/.well-known/ai-catalog.json` follows the [AI Catalog draft](https://github.com/Agent-Card/ai-catalog). It lists the actual setup skill, with a Markdown media type, domain-scoped identifier, and representative queries. These discovery formats remain drafts.
- Discovery documents allow cross-origin public reads. They contain no private account data. HTML links, HTTP `Link` headers, `llms.txt`, and the robots `Agentmap` hint expose discovery paths.
- Content Signals in `robots.txt` and response headers permit search and agent input, and decline model training: `ai-train=no, search=yes, ai-input=yes`. These are usage preferences, separate from crawler access and access controls. See [Content Signals](https://contentsignals.org/) and its [IETF draft](https://datatracker.ietf.org/doc/draft-romm-aipref-contentsignals/).

## SvelteKit and Vercel

Marketing HTML remains pre-rendered with the existing strict build checks. The Vercel build command explicitly runs the package build script. After the Vercel adapter builds, `scripts/markdown-routing.mjs` copies the exact public HTML snapshots into the existing function bundle and inserts a header-conditioned route before static path aliases and filesystem serving. Explicit Markdown requests use the function's public-page fallback and conversion hook, where the full Accept header is evaluated. HTML requests continue to use static files. Blog and canary pages use their existing dynamic loaders; the protocol guide supports the same negotiation. The build asserts that every expected public static page exists. The fallback route uses an allowlist matcher so unknown URLs retain their existing styled 404, and broken-link build checks remain intact. The noindex design-system reference is excluded.

The legacy `/docs/marmot/README.md` URL retains HTML by default through file-specific Build Output API `contentType` metadata. This replaces its unconditional response-header override, which could otherwise overwrite negotiated Markdown. Deployment smoke tests verify this metadata and both response types. See [Vercel Build Output configuration](https://vercel.com/docs/build-output-api/configuration) and [CDN cache negotiation](https://vercel.com/docs/caching/cdn-cache).

The conversion preserves security and cache headers, varies on `Accept`, strips obsolete body validators, excludes global navigation and controls, resolves relative links, and preserves headings, code and tables. It runs on successful HTML reads only; redirects, errors, assets, JSON, and existing text exports keep their representation. It needs no hosting migration or Cloudflare subscription. [Cloudflare's implementation](https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/) documents the same representation/cache distinction. [SvelteKit page options](https://svelte.dev/docs/kit/page-options) describe pre-rendering.

The deployment smoke test checks the isolated Vercel function, static output and header-conditioned routing. After deployment, verify both variants on the public domain:

```sh
curl -i https://www.whitenoise.chat/download -H 'Accept: text/html'
curl -i https://www.whitenoise.chat/download -H 'Accept: text/markdown'
curl -i https://www.whitenoise.chat/.well-known/agent-skills/index.json
```

## Recommendations requiring a real service

The [agent-readiness checklist](https://isitagentready.com/) also covers service capabilities. Missing service metadata is not a reason to invent a service:

| Recommendation | Applicability |
| --- | --- |
| DNS-AID and DNSSEC | [DNS-AID](https://datatracker.ietf.org/doc/draft-mozleywilliams-dnsop-dnsaid/) is an individual Internet-Draft for discovering agent endpoints. There is no hosted agent endpoint here. If one is introduced, its operator must publish truthful protocol/endpoint SVCB records through the authoritative DNS provider and validate the DNSSEC chain, including registrar DS records. Application files cannot publish or sign DNS. [RFC 9460](https://www.rfc-editor.org/rfc/rfc9460) defines SVCB/HTTPS records. |
| API catalog | [RFC 9727](https://www.rfc-editor.org/rfc/rfc9727) catalogs APIs and their descriptions. Public documentation pages are not a messaging API. Add a catalog when an actual documented API exists. |
| OAuth/OIDC discovery, protected-resource metadata, auth.md | No protected HTTP API or issuer exists here. Do not advertise token endpoints, scopes, registration or credentials. [RFC 8414](https://www.rfc-editor.org/rfc/rfc8414) and [RFC 9728](https://www.rfc-editor.org/rfc/rfc9728) describe metadata for real authorization servers and resources. |
| MCP server card | Needs an actual MCP server, transport and capabilities. The local Marmot connector is not a website-hosted MCP server. |
| WebMCP | Useful for browser actions and forms. This informational site has ordinary navigation, read-only guides and outbound downloads. A tool wrapper adds maintenance without enabling a necessary new action. |

Continue preserving crawlable server-rendered content, meaningful links and schema metadata that matches visible content. Google's [AI search guidance](https://developers.google.com/search/docs/appearance/ai-features) requires the ordinary indexing foundations, not a particular agent-discovery score.
