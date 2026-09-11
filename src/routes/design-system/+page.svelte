<script lang="ts">
import Artwork from "$lib/components/site/Artwork.svelte";
import PageIntro from "$lib/components/site/PageIntro.svelte";
import Supporters from "$lib/components/site/Supporters.svelte";
import Action from "$lib/components/system/Action.svelte";
import CopyButton from "$lib/components/system/CopyButton.svelte";
import Disclosure from "$lib/components/system/Disclosure.svelte";
import Grid from "$lib/components/system/Grid.svelte";
import Icon from "$lib/components/system/Icon.svelte";
import Surface from "$lib/components/system/Surface.svelte";
import Text from "$lib/components/system/Text.svelte";
import TextLink from "$lib/components/system/TextLink.svelte";
import { type IconName, iconMeanings, icons } from "$lib/design-system/icons";
import {
    breakpoints,
    contrastRatio,
    describeValue,
    pixels,
    tokenById,
    tokens,
} from "$lib/design-system/tokens";
import { type TextRole, textRoles, typography } from "$lib/design-system/typography";
import "$lib/design-system/reference.css";

let query = $state("");
let category = $state("All");
let showReviewOnly = $state(false);
let guides = $state(true);
let actionFeedback = $state("");
const categories = ["All", ...new Set(tokens.map((t) => t.category))];
const filtered = $derived(
    tokens.filter(
        (t) =>
            (category === "All" || t.category === category) &&
            (!showReviewOnly || t.status === "review") &&
            `${t.id} ${t.value} ${t.note} ${t.uses.join(" ")}`
                .toLowerCase()
                .includes(query.toLowerCase())
    )
);
const colors = tokens.filter((t) => t.category === "Color");
const spacing = tokens
    .filter((t) => t.category === "Spacing" && t.status === "established")
    .sort((a, b) => Number.parseFloat(a.value) - Number.parseFloat(b.value));
const rhythm = tokens.filter((t) => t.category === "Rhythm");
const specimens: { role: TextRole; title: string; sample: string; use: string }[] = [
    {
        role: "display",
        title: "Display",
        sample: "A little more noise, a little more you.",
        use: "Page introductions, article and legal titles: 72px desktop, 48px tablet and mobile. The homepage hero also retains 48px on mobile. The shared closing statement fits two fixed lines to its container, capped at 72px.",
    },
    {
        role: "section",
        title: "Section",
        sample: "Keep it between you.",
        use: "Feature sections and FAQ: 48px desktop, 36px tablet, 24px mobile. Blog listing titles use this section scale and retain 36px on mobile.",
    },
    {
        role: "heading",
        title: "Reading heading",
        sample: "Room to be yourself.",
        use: "32px desktop/tablet and 24px mobile across articles, policy, canary, contribution paths and download options.",
    },
    {
        role: "title",
        title: "Small heading",
        sample: "Lightning address",
        use: "24px bold desktop/tablet and 18px mobile for subsections and donation titles.",
    },
    {
        role: "lead",
        title: "Introduction",
        sample: "A conversation with a friend. An idea that needs room to grow.",
        use: "24px regular introduction; 18px on mobile.",
    },
    {
        role: "body",
        title: "Body",
        sample: "Private spaces let us work things out, change our minds, and connect without performing for an audience.",
        use: "18px regular, 1.65 leading. Shared reading copy across every page, at every viewport.",
    },
    {
        role: "small",
        title: "Compact copy",
        sample: "whitenoise@npub.cash",
        use: "16px regular for addresses, compact descriptions and disclosure answers.",
    },
    {
        role: "ui",
        title: "Interface",
        sample: "Privacy Matters · Contribute · Download",
        use: "16px semibold for navigation, actions, text links and disclosure questions.",
    },
    {
        role: "caption",
        title: "Caption",
        sample: "© 2026 Internet Privacy Foundation",
        use: "14px regular for dates and copyright.",
    },
];
const iconNames = Object.keys(icons) as IconName[];
const artNames = ["lantern", "identity", "agents", "roots", "open", "community"] as const;
function recipeFor(role: TextRole) {
    return typography.filter((recipe) =>
        recipe.selectors
            .split(",")
            .map((s) => s.trim())
            .includes(textRoles[role])
    );
}
</script>

<svelte:head>
    <title>Design system — White Noise</title>
    <meta name="robots" content="noindex, nofollow" />
    <meta name="description" content="Internal visual reference for White Noise design tokens, components, and current design decisions." />
</svelte:head>
<div class="site-width design-reference">
    <PageIntro title="White Noise design system." description="One system for every page. Shared typography, a neutral palette, consistent spacing and working components." />
    <div class="ds-introduction article-body">
        <p>Eight colors. Eight type sizes. Four weights. Fourteen spacing steps. The site and this reference share the same catalogs and components. Related content uses the same rules wherever it appears.</p>
        <p>Manrope. Black on white. Left-aligned reading. A quiet grid. Whitespace carries the structure; rules have a functional job. Interactions are immediate cuts.</p>
    </div>
    <nav class="ds-index" aria-label="Design system contents">
        {#each ["Foundations", "Typography", "Spacing", "Grids", "Actions", "Icons", "Artwork", "Patterns", "Review", "Tokens"] as item}<a href={`#ds-${item.toLowerCase()}`}>{item}</a>{/each}
    </nav>

    <section class="ds-section" id="ds-foundations">
        <Text as="h2" role="section">Foundations.</Text>
        <p class="ds-lead">A neutral palette with semantic roles. The swatches below are live CSS variables, not copied colors.</p>
        <div class="ds-colors">
            {#each colors as token}
                <article class="ds-color">
                    <div class="ds-swatch" style:background={`var(--${token.id})`} aria-label={token.value}></div>
                    <h3>{token.id}</h3>
                    <code>{token.value}</code>
                    <p>{token.note}</p>
                    {#if token.status === "review"}<span class="ds-status">Review</span>{/if}
                </article>
            {/each}
        </div>
        <h3 class="ds-subtitle">Text contrast</h3>
        <div class="ds-table-wrap"><table class="ds-table"><caption>Computed from the token values. AA requires 4.5:1 for normal text or 3:1 for large text.</caption>
            <thead><tr><th>Pair</th><th>Ratio</th><th>Current use</th></tr></thead><tbody>
                {#each [["color-ink", "color-paper", "Primary text"], ["color-muted", "color-paper", "Supporting text"], ["color-muted", "color-surface", "Addresses on gray"], ["color-muted", "color-paper", "Signed-event links"], ["color-hero-muted", "color-paper", "Hero tagline — below AA; decision pending"], ["color-inverse-muted", "color-ink", "Copyright"]] as [front, back, use]}
                    <tr><td>{front} / {back}</td><td>{contrastRatio(tokenById[front].value, tokenById[back].value).toFixed(2)}:1</td><td>{use}</td></tr>
                {/each}
            </tbody></table></div>
    </section>

    <section class="ds-section" id="ds-typography">
        <Text as="h2" role="section">Typography.</Text>
        <p class="ds-lead">One self-hosted family: Manrope Variable. Eight root-relative size steps: 14, 16, 18, 24, 32, 36, 48 and 72px. Nine complete roles combine them with four weights, four line heights and three tracking values. Responsive headings move between the same steps; no separate mobile scale. Semantic heading level and visual role are independent.</p>
        <div class="ds-weights">{#each ["regular", "semibold", "bold", "heavy"] as weight}<p style:font-weight={`var(--weight-${weight})`}>Aa <span>{weight} · {tokenById[`weight-${weight}`].value}</span></p>{/each}</div>
        {#each specimens as specimen}
            <article class="ds-type-specimen">
                <div class="ds-meta"><h3>{specimen.title}</h3><code>Text role="{specimen.role}"</code></div>
                <Text role={specimen.role}>{specimen.sample}</Text>
                <p class="ds-note">{specimen.use}</p>
                <details class="ds-details"><summary>Recipe and responsive values</summary>
                    {#each recipeFor(specimen.role) as recipe}<p>{recipe.media ? `At ${recipe.media}px and below` : "Default"}</p><dl class="ds-recipe">{#each Object.entries(recipe.properties) as [property, value]}<dt>{property}</dt><dd><code>{value}</code><br />{describeValue(value)}</dd>{/each}</dl>{/each}
                </details>
            </article>
        {/each}
        <article class="ds-type-specimen">
            <div class="ds-meta"><h3>Hero tagline</h3><code>hero-tagline-fit</code></div>
            <div class="hero-title"><p class="hero-tagline"><span>The identity-free</span> <span>messenger for private</span> <span>communication.</span></p></div>
            <p class="ds-note">Desktop retains its display size and natural wrapping. At 900px and below, the tagline scales to fit three fixed lines, breaking after “identity-free” and “private”, capped at 48px. The mobile title stays 48px. The pale gray remains the existing contrast review item.</p>
        </article>
        <details class="ds-details"><summary>All shared recipes and responsive rules ({typography.length})</summary>
            <p>These recipes style both the real pages and the specimens above. Page selectors select a role; they do not introduce their own size, weight or line height.</p>
            {#each typography as recipe}<div class="ds-recipe-record"><h3>{recipe.id}</h3><code>{recipe.selectors}</code><p>{recipe.media ? `≤ ${recipe.media}px` : "Default"}</p><dl class="ds-recipe">{#each Object.entries(recipe.properties) as [prop, val]}<dt>{prop}</dt><dd><code>{val}</code><br />{describeValue(val)}</dd>{/each}</dl></div>{/each}
        </details>
    </section>

    <section class="ds-section" id="ds-spacing">
        <Text as="h2" role="section">Spacing.</Text>
        <p class="ds-lead">A four-pixel base with fourteen steps. Small distances are precise; larger gaps follow a restrained rhythm. Use the relationship tokens below for recurring composition rather than selecting a new distance on each page.</p>
        <div class="ds-spacing">{#each spacing as token}<div><code>{token.id}</code><span class="ds-space-bar" style:width={`var(--${token.id})`}></span><span>{token.value}</span></div>{/each}</div>
        <h3 class="ds-subtitle">Shared relationships</h3>
        <div class="ds-table-wrap"><table class="ds-table"><thead><tr><th>Relationship</th><th>Default</th><th>Purpose</th></tr></thead><tbody>{#each rhythm as token}<tr><td><code>{token.id}</code></td><td>{describeValue(token.value)}</td><td>{token.note}</td></tr>{/each}</tbody></table></div>
        <p class="ds-note">Page introductions use equal top and bottom padding. Supporting bands share a slightly larger bottom inset for optical balance: 56/64px desktop, 40/48px mobile. Source artwork bounds and 44px interaction targets are geometry, not additional spacing choices.</p>
    </section>

    <section class="ds-section" id="ds-grids">
        <Text as="h2" role="section">Grids and alignment.</Text>
        <p class="ds-lead">A {tokenById["size-page"].value} outer container, centered on the viewport; content aligns to its left edge. Reading columns stay left-aligned inside it. Full-width bands extend the background without moving the content.</p>
        <div class="ds-table-wrap"><table class="ds-table"><thead><tr><th>Viewport</th><th>Side margin</th><th>Behavior</th></tr></thead><tbody>
            <tr><td>Above {breakpoints.tablet}px</td><td>{pixels("size-gutters-desktop") / 2}px minimum</td><td>{pixels("size-page")}px maximum content width</td></tr>
            <tr><td>{breakpoints.mobile + 1}–{breakpoints.tablet}px</td><td>{pixels("size-gutters-tablet") / 2}px</td><td>Stacked features and homepage FAQ; compact navigation; two-column utility content</td></tr>
            <tr><td>≤ {breakpoints.mobile}px</td><td>{pixels("size-gutters-mobile") / 2}px</td><td>Single-column content; 18px / 1.5 body text; compact navigation with Download in the menu</td></tr>
        </tbody></table></div>
        <label class="ds-toggle"><input type="checkbox" bind:checked={guides} /> Show demonstration guides</label>
        <div class="ds-grid-demo" class:show-guides={guides}>
            <Grid><div><Text as="h3" role="title">First column</Text><p>Lightning, contribution paths and balanced content pairs.</p></div><div><Text as="h3" role="title">Second column</Text><p>Equal tracks. The gutter separates content without a visible rule.</p></div></Grid>
            <Grid columns={3}>{#each ["iPhone", "Android", "Direct download"] as label}<div><Text as="h3" role="title">{label}</Text><p>The same three-column primitive used by the download page.</p></div>{/each}</Grid>
        </div>
        <p class="ds-note">Guides are documentation aids only. Features and the homepage FAQ use equal columns on desktop and stack at 900px. Contribution paths, downloads, donations and the Contribute hero keep their pair until 640px. Essays, blog articles, policy, canary and technical content share one 768px reading width. Blog thumbnails use a smaller track on tablets; entries without an image use the reading width.</p>
    </section>

    <section class="ds-section" id="ds-actions">
        <Text as="h2" role="section">Actions and feedback.</Text>
        <p class="ds-lead">One 56px minimum height, 16px semibold label, 24px horizontal padding and 24px icon gap. Primary and secondary variants. The primary action automatically inverts on a dark Surface. Native links navigate; native buttons act. Focus and hover are immediate cuts.</p>
        <div class="ds-action-row"><Action href="/download" label="Download" icon="down" /><Action href="/contribute" label="Contribute" icon="right" variant="secondary" /><Action href="https://github.com/marmot-protocol" label="GitHub" icon="external" external /><Action label="Disabled" disabled /></div>
        <Surface tone="ink" class="ds-surface-demo"><Text as="h3" role="title" tone="inverse">Primary action on dark</Text><Action href="/download" label="Download" icon="down" /></Surface>
        <div class="ds-action-row"><Action label="Try an action" onclick={() => { actionFeedback = "Action activated."; }} /><span role="status">{actionFeedback}</span><TextLink href="/privacy-matters">Text link</TextLink></div>
        <div class="ds-copy-demo"><span>example@white-noise.test</span><CopyButton value="example@white-noise.test" label="example address" /></div>
        <p class="ds-note">Copy uses a 44px target and a 20px icon. Success switches to a checkmark for three seconds; a screen reader receives status text. The address remains selectable if clipboard access fails. This specimen copies a harmless example, not a donation address.</p>
        <Disclosure title="What does an open disclosure look like?"><p>This is the same native details component used by the homepage FAQ. Enter or Space opens it. The glyph changes instantly; the answer stays in normal document flow.</p></Disclosure>
        <details class="ds-details"><summary>Component APIs</summary><pre><code>{`<Action href="/download" label="Download" icon="down" />
<Action label="Copy" onclick={handler} />
<Action variant="secondary" label="Contribute" href="/contribute" />
<CopyButton value={address} label="Lightning address" />
<Disclosure title="Question">Answer content</Disclosure>
<Text as="h2" role="heading">Section title</Text>
<Grid columns={2}>…</Grid>
<Surface tone="muted">…</Surface>
<Container>…</Container>`}</code></pre></details>
    </section>

    <section class="ds-section" id="ds-icons">
        <Text as="h2" role="section">Icons.</Text>
        <p class="ds-lead">Carbon’s existing glyphs, one registry and one rendering component. Keep the original paths. Icons inherit text color and are decorative inside controls with accessible labels.</p>
        <div class="ds-icon-grid">{#each iconNames as name}<article><Icon {name} /><h3>{name}</h3><p>{iconMeanings[name]}</p></article>{/each}</div>
        <p class="ds-note">The WN mark and supporter logos are brand assets, not interface icons. Do not redraw them or substitute an icon-font approximation.</p>
    </section>

    <section class="ds-section" id="ds-artwork">
        <Text as="h2" role="section">Identity and artwork.</Text>
        <div class="ds-brand"><img src="/images/logomark.svg" width="48" height="37" alt="White Noise mark" /><p>Canonical mark. Black treatment, original proportions. 48px desktop width and 38px mobile width.</p></div>
        <p class="ds-lead">Six transparent Figma sculptures share measured visible-pixel bounds, rather than raw PNG dimensions. Their normalized viewports have the same visible height and center against the adjacent copy.</p>
        <Grid>{#each artNames as name}<div class="ds-art"><Artwork {name} /><h3>{name}</h3></div>{/each}</Grid>
        <details class="ds-details"><summary>Asset sizing and provenance</summary><p>Sources: Figma Marketing file JnQBwAwtSteJR3NO0iVPyp. Original exports are 1200×1200. Shared viewport ratio 1103:939; current desktop visible-height target 400px. The viewport width is derived from that height and the measured source ratio. Mobile maximum is 22rem wide. Exact bounds live in the artwork registry; source pixels are unchanged.</p><p>See README.md for node references. Brand assets remain at static/images; sculptures at static/images/rebuild.</p></details>
        <div class="ds-supporter-demo"><Supporters /></div>
    </section>

    <section class="ds-section" id="ds-patterns">
        <Text as="h2" role="section">Patterns in use.</Text>
        <p class="ds-lead">The reusable primitives are used on real pages, including this one. Existing composition classes bind them into page patterns.</p>
        <dl class="ds-patterns">
            <dt>Header</dt><dd>Permanent WN mark, native route links, current-page underline, white sticky surface. Compact navigation includes the muted page name beside Menu. Guides add a full-width section disclosure below it, inside the sticky header. Both menus use square edges and fine rules; Escape closes and restores focus.</dd>
            <dt>Page introduction</dt><dd>PageIntro uses the shared Text title role; description measure and spacing remain centralized.</dd>
            <dt>Full-width band</dt><dd>Surface is shared by Supporters, donation methods, latest canary and the closing footer. Functional focus outlines remain visible.</dd>
            <dt>Content grids</dt><dd>Grid powers contribution paths and download options; single-column reflow uses the same mobile breakpoint.</dd>
            <dt>FAQ</dt><dd>Disclosure owns native open/close behavior and the shared Add icon. A rule separates interactive questions only.</dd>
            <dt>Donation</dt><dd>Black small headings, gray selectable addresses, shared CopyButton and Action. Two columns on desktop, stacked on mobile.</dd>
            <dt>Articles and legal text</dt><dd>Sanitized content keeps semantic headings, lists and links. Typography recipes style generated markup; legal content is unchanged.</dd>
            <dt>Footer</dt><dd>One shared root-layout closing statement, Download action and Internet Privacy Foundation copyright.</dd>
        </dl>
    </section>

    <section class="ds-section" id="ds-review">
        <Text as="h2" role="section">Consolidation and exceptions.</Text>
        <p class="ds-lead">The consolidation replaces near-duplicates across the entire site. Measured asset geometry remains intact.</p>
        <ol class="ds-review-list">
            <li><strong>Typography.</strong> 28 size definitions were consolidated into seven steps; the approved 36px mobile tagline adds an eighth. Six weights become four. Fifteen line heights become four. Six tracking values become three.</li>
            <li><strong>Spacing.</strong> 46 distances become fourteen steps with eight shared relationship tokens. There are no legacy spacing exceptions in live styles.</li>
            <li><strong>Colors.</strong> Sixteen colors become eight. Reading copy and secondary links share one gray; all light-gray surfaces share one neutral.</li>
            <li><strong>Composition.</strong> One reading measure, equal content columns, and one text-action height replace page-specific variants.</li>
            <li><strong>Hero contrast — open decision.</strong> The previously approved {tokenById["color-hero-muted"].value} tagline remains below AA. This is the only remaining review token. Its color is preserved pending that specific visual decision.</li>
        </ol>
        <p class="ds-note">New presentation should use these roles and components. A new token needs a specific purpose and a live specimen; duplicating a value under a new name is not a new design decision.</p>
    </section>

    <section class="ds-section" id="ds-tokens">
        <Text as="h2" role="section">Token reference.</Text>
        <p class="ds-lead">Search the catalog that generates the site’s CSS. The only outstanding review item is the pale hero text color.</p>
        <div class="ds-filters"><label>Search<input type="search" bind:value={query} placeholder="Token, value, selector…" /></label><label>Category<select bind:value={category}>{#each categories as item}<option>{item}</option>{/each}</select></label><label class="ds-toggle"><input type="checkbox" bind:checked={showReviewOnly} /> Review only</label></div>
        <p class="ds-note" role="status">{filtered.length} of {tokens.length} tokens</p>
        <div class="ds-table-wrap"><table class="ds-table"><thead><tr><th>Token / value</th><th>Role and provenance</th><th>Status</th></tr></thead><tbody>{#each filtered as token}<tr><td><code>--{token.id}</code><br /><code>{token.value}</code></td><td>{token.note}<details><summary>Consumers ({token.uses.length})</summary><p>{token.uses.join(", ") || "Shared primitive or documented foundation."}</p></details></td><td>{token.status}</td></tr>{/each}</tbody></table></div>
        <p class="ds-note">Source: src/lib/design-system/tokens.json and typography.json. Regenerate with bun run tokens:generate. The test suite checks generated files, references, breakpoint consistency and new un-tokenized style values.</p>
    </section>
</div>
