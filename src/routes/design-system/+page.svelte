<script lang="ts">
import Artwork from "$lib/components/rebuild/Artwork.svelte";
import PageIntro from "$lib/components/rebuild/PageIntro.svelte";
import Supporters from "$lib/components/rebuild/Supporters.svelte";
import Action from "$lib/components/system/Action.svelte";
import CopyButton from "$lib/components/system/CopyButton.svelte";
import Disclosure from "$lib/components/system/Disclosure.svelte";
import Grid from "$lib/components/system/Grid.svelte";
import Icon from "$lib/components/system/Icon.svelte";
import Surface from "$lib/components/system/Surface.svelte";
import Text from "$lib/components/system/Text.svelte";
import TextLink from "$lib/components/system/TextLink.svelte";
import baseline from "$lib/design-system/baseline.json";
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
const inheritedSpacing = tokens.filter((t) => t.category === "Spacing" && t.status === "review");
const specimens: { role: TextRole; title: string; sample: string; use: string }[] = [
    {
        role: "hero",
        title: "Homepage masthead",
        sample: "White Noise",
        use: "Homepage title and inherited tagline scale. Heavy name; semibold tagline.",
    },
    {
        role: "page",
        title: "Page title",
        sample: "Good things are built together.",
        use: "Secondary-page introductions and Privacy Policy title.",
    },
    {
        role: "closing",
        title: "Closing statement",
        sample: "A little more noise, a little more you.",
        use: "The shared black footer uses this scale in white.",
    },
    {
        role: "section",
        title: "Feature heading",
        sample: "Keep it between you.",
        use: "Homepage feature sections. The FAQ has a retained mobile-size exception.",
    },
    {
        role: "readingTitle",
        title: "Reading heading",
        sample: "Room to be yourself.",
        use: "Privacy Matters, legal sections and Canary headings.",
    },
    {
        role: "title",
        title: "Small heading",
        sample: "Lightning address",
        use: "Donation method titles; black, strong, with tight space to the address.",
    },
    {
        role: "lead",
        title: "Introduction",
        sample: "A conversation with a friend. An idea that needs room to grow.",
        use: "Supporting copy below secondary-page titles.",
    },
    {
        role: "body",
        title: "Reading text",
        sample: "Private spaces let us work things out, change our minds, and connect without performing for an audience.",
        use: "The essay reading style. Other body variants remain in the captured recipe index below.",
    },
    {
        role: "navigation",
        title: "Navigation",
        sample: "Privacy Matters   Blog   Contribute   GitHub   Download",
        use: "Desktop navigation. The live header above also demonstrates active, hover, focus and mobile menu behavior.",
    },
    {
        role: "action",
        title: "Action label",
        sample: "Download",
        use: "Primary and secondary actions; the action component owns the surface and target geometry.",
    },
    {
        role: "caption",
        title: "Caption",
        sample: "© 2026 Internet Privacy Foundation",
        use: "Copyright. Uses inverse muted gray on the actual footer.",
    },
];
const iconNames = Object.keys(icons) as IconName[];
const artNames = ["lantern", "identity", "roots", "community"] as const;
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
    <PageIntro title="White Noise design system." description="A living reference for the site we have. Shared tokens, working components, and the decisions still to make." />
    <div class="ds-introduction article-body">
        <p>This is the captured Plain design, not a claim that every inherited value belongs in the final system. The site and this page use the same token catalog and typography recipes. Review items remain visible until we agree how to consolidate them.</p>
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
                {#each [["color-ink", "color-paper", "Primary text"], ["color-muted", "color-paper", "Supporting text"], ["color-muted", "color-surface", "Addresses on gray"], ["color-secondary", "color-paper", "Signed-event links"], ["color-hero-muted", "color-paper", "Hero tagline — below AA; decision pending"], ["color-inverse-muted", "color-ink", "Copyright"]] as [front, back, use]}
                    <tr><td>{front} / {back}</td><td>{contrastRatio(tokenById[front].value, tokenById[back].value).toFixed(2)}:1</td><td>{use}</td></tr>
                {/each}
            </tbody></table></div>
    </section>

    <section class="ds-section" id="ds-typography">
        <Text as="h2" role="section">Typography.</Text>
        <p class="ds-lead">One self-hosted family: Manrope Variable. Font sizes are root-relative; fluid titles retain the current viewport interpolation. Semantic heading level and visual role are independent.</p>
        <div class="ds-weights">{#each ["regular", "semibold", "link", "bold", "display", "heavy"] as weight}<p style:font-weight={`var(--weight-${weight})`}>Aa <span>{weight} · {tokenById[`weight-${weight}`].value}</span></p>{/each}</div>
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
        <details class="ds-details"><summary>All {typography.length} captured typography rules, including local variants</summary>
            <p>These are the live rules, extracted from the site. Similar body and heading sizes are not silently merged in this baseline.</p>
            {#each typography as recipe}<div class="ds-recipe-record"><h3>{recipe.id}</h3><code>{recipe.selectors}</code><p>{recipe.media ? `≤ ${recipe.media}px` : "Default"}</p><dl class="ds-recipe">{#each Object.entries(recipe.properties) as [prop, val]}<dt>{prop}</dt><dd><code>{val}</code><br />{describeValue(val)}</dd>{/each}</dl></div>{/each}
        </details>
    </section>

    <section class="ds-section" id="ds-spacing">
        <Text as="h2" role="section">Spacing.</Text>
        <p class="ds-lead">Four pixels at a 16px root is the base unit. The bars show existing on-grid distances. Small optical offsets and inherited off-grid values are listed separately, not promoted into the recommended scale.</p>
        <div class="ds-spacing">{#each spacing as token}<div><code>{token.id}</code><span class="ds-space-bar" style:width={`var(--${token.id})`}></span><span>{token.value}</span></div>{/each}</div>
        <details class="ds-details"><summary>{inheritedSpacing.length} inherited spacing exceptions to review</summary><div class="ds-table-wrap"><table class="ds-table"><thead><tr><th>Token</th><th>Value</th><th>Where it came from</th></tr></thead><tbody>{#each inheritedSpacing as token}<tr><td><code>{token.id}</code></td><td>{token.value}</td><td>{token.uses.join(", ")}</td></tr>{/each}</tbody></table></div></details>
        <p class="ds-note">Examples: the supporter band’s unequal top/bottom padding is an approved optical adjustment. The 74px/76px page-intro pair is inherited and needs a spacing decision. Asset bounds, focus strokes and hit targets are geometry, not spacing-scale steps.</p>
    </section>

    <section class="ds-section" id="ds-grids">
        <Text as="h2" role="section">Grids and alignment.</Text>
        <p class="ds-lead">A {tokenById["size-page"].value} outer container, centered on the viewport; content aligns to its left edge. Reading columns stay left-aligned inside it. Full-width bands extend the background without moving the content.</p>
        <div class="ds-table-wrap"><table class="ds-table"><thead><tr><th>Viewport</th><th>Side margin</th><th>Behavior</th></tr></thead><tbody>
            <tr><td>Above {breakpoints.tablet}px</td><td>{pixels("size-gutters-desktop") / 2}px minimum</td><td>{pixels("size-page")}px maximum content width</td></tr>
            <tr><td>{breakpoints.mobile + 1}–{breakpoints.tablet}px</td><td>{pixels("size-gutters-tablet") / 2}px</td><td>Tablet gutters, reduced column gaps</td></tr>
            <tr><td>≤ {breakpoints.mobile}px</td><td>{pixels("size-gutters-mobile") / 2}px</td><td>Single-column content, mobile navigation</td></tr>
        </tbody></table></div>
        <label class="ds-toggle"><input type="checkbox" bind:checked={guides} /> Show demonstration guides</label>
        <div class="ds-grid-demo" class:show-guides={guides}>
            <Grid><div><Text as="h3" role="title">First column</Text><p>Lightning, contribution paths and balanced content pairs.</p></div><div><Text as="h3" role="title">Second column</Text><p>Equal tracks. The gutter separates content without a visible rule.</p></div></Grid>
            <Grid columns={3}>{#each ["iPhone", "Android", "Direct download"] as label}<div><Text as="h3" role="title">{label}</Text><p>The same three-column primitive used by the download page.</p></div>{/each}</Grid>
        </div>
        <p class="ds-note">Guides are documentation aids only. Homepage artwork, the FAQ and the Contribute hero retain their captured 1:1, 1:1.1 and 1.1:1 compositions. Reading measures: 740px essays, 800px blog articles, 850px technical content. These differences are documented for the next review.</p>
    </section>

    <section class="ds-section" id="ds-actions">
        <Text as="h2" role="section">Actions and feedback.</Text>
        <p class="ds-lead">Native links navigate. Native buttons perform actions. Square corners, no elevation, and no animation. Tab through these real components to inspect focus.</p>
        <div class="ds-action-row"><Action href="/download" label="Download" icon="down" /><Action href="/contribute" label="Contribute" icon="right" variant="secondary" /><Action href="https://github.com/marmot-protocol" label="GitHub" icon="external" external /><Action label="Disabled" disabled /></div>
        <Surface tone="ink" class="ds-surface-demo"><Text as="h3" role="title" tone="inverse">Inverse action</Text><Action href="/download" label="Download" icon="down" variant="inverse" /></Surface>
        <div class="ds-action-row"><Action label="Try an action" onclick={() => { actionFeedback = "Action activated."; }} /><span role="status">{actionFeedback}</span><TextLink href="/privacy-matters">Text link</TextLink></div>
        <div class="ds-copy-demo"><span>example@white-noise.test</span><CopyButton value="example@white-noise.test" label="example address" /></div>
        <p class="ds-note">Copy uses a 44px target and a 20px icon. Success switches to a checkmark for three seconds; a screen reader receives status text. The address remains selectable if clipboard access fails. This specimen copies a harmless example, not a donation address.</p>
        <Disclosure title="What does an open disclosure look like?"><p>This is the same native details component used by the homepage FAQ. Enter or Space opens it. The glyph changes instantly; the answer stays in normal document flow.</p></Disclosure>
        <details class="ds-details"><summary>Component APIs</summary><pre><code>{`<Action href="/download" label="Download" icon="down" />
<Action label="Copy" onclick={handler} />
<Action variant="secondary" label="Contribute" href="/contribute" />
<CopyButton value={address} label="Lightning address" />
<Disclosure title="Question">Answer content</Disclosure>
<Text as="h2" role="readingTitle">Section title</Text>
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
        <p class="ds-lead">Four transparent Figma sculptures share measured visible-pixel bounds, rather than raw PNG dimensions. Their normalized viewports have the same visible height and center against the adjacent copy.</p>
        <Grid>{#each artNames as name}<div class="ds-art"><Artwork {name} normalized /><h3>{name}</h3></div>{/each}</Grid>
        <details class="ds-details"><summary>Asset sizing and provenance</summary><p>Sources: Figma Marketing file JnQBwAwtSteJR3NO0iVPyp. Original exports are 1200×1200. Shared viewport ratio 1103:939; current desktop visible-height target 400px. The slightly rounded 29.366rem viewport maximum is retained for comparison. Mobile maximum is 22rem wide. Exact bounds live in the artwork registry; source pixels are unchanged.</p><p>See REBUILD.md for node references. Brand assets remain at static/images; sculptures at static/images/rebuild.</p></details>
        <div class="ds-supporter-demo"><Supporters /></div>
    </section>

    <section class="ds-section" id="ds-patterns">
        <Text as="h2" role="section">Patterns in use.</Text>
        <p class="ds-lead">The reusable primitives are used on real pages, including this one. Existing composition classes bind them into page patterns.</p>
        <dl class="ds-patterns">
            <dt>Header</dt><dd>Permanent WN mark, native route links, current-page underline, white sticky surface. Mobile Menu closes with Escape and restores focus.</dd>
            <dt>Page introduction</dt><dd>PageIntro uses the shared Text title role; description measure and spacing remain centralized.</dd>
            <dt>Full-width band</dt><dd>Surface is shared by Supporters, donation methods, latest canary and the closing footer. Functional focus outlines remain visible.</dd>
            <dt>Content grids</dt><dd>Grid powers contribution paths and download options; single-column reflow uses the same mobile breakpoint.</dd>
            <dt>FAQ</dt><dd>Disclosure owns native open/close behavior and the shared Add icon. A rule separates interactive questions only.</dd>
            <dt>Donation</dt><dd>Black small headings, gray selectable addresses, shared CopyButton and Action. Two columns on desktop, stacked on mobile.</dd>
            <dt>Articles and legal text</dt><dd>Sanitized content keeps semantic headings, lists and links. Typography recipes style generated markup; legal content is unchanged.</dd>
            <dt>Footer</dt><dd>One shared root-layout closing statement, Download action and Internet Privacy Foundation copyright. The temporary Design system link is controlled by preview.ts.</dd>
        </dl>
    </section>

    <section class="ds-section" id="ds-review">
        <Text as="h2" role="section">Decisions to make next.</Text>
        <p class="ds-lead">Establish first, refine together. These are explicit exceptions, not suggestions to use more arbitrary values.</p>
        <ol class="ds-review-list">
            <li><strong>Type hierarchy.</strong> The captured stylesheet had {Object.keys(baseline["font-size"]).length} font-size definitions. Feature, article, donation and technical headings currently differ. Choose the final role hierarchy before merging them.</li>
            <li><strong>Spacing rhythm.</strong> Consolidate off-grid distances. Retain documented optical corrections only where a visual comparison supports them.</li>
            <li><strong>Neutral colors.</strong> The secondary action and code surfaces have a slight warm tint. Blog body gray differs from essay gray. Choose whether to collapse these onto the main neutral roles.</li>
            <li><strong>Hero contrast.</strong> The approved {tokenById["color-hero-muted"].value} tagline is too light for AA. Its token is marked for review; its appearance has not been silently changed.</li>
            <li><strong>Control sizing.</strong> General actions are 52px minimum; donation actions are 56px. Navigation and icon targets use 44px. Review the two action heights.</li>
            <li><strong>Reading grids.</strong> Confirm the 740/800/850px measures and the unequal hero/FAQ ratios, then reduce variants if desired.</li>
        </ol>
        <p class="ds-note">New styles should use existing tokens and components. An exception needs a named role, a reason, a specimen here, and a test update—not a new literal hidden in a page. The archived Glitch palette and unmounted legacy components are outside the active design system.</p>
    </section>

    <section class="ds-section" id="ds-tokens">
        <Text as="h2" role="section">Token reference.</Text>
        <p class="ds-lead">Search the same catalog that generates the site’s CSS. Values and provenance are visible; “review” means captured and pending consolidation.</p>
        <div class="ds-filters"><label>Search<input type="search" bind:value={query} placeholder="Token, value, selector…" /></label><label>Category<select bind:value={category}>{#each categories as item}<option>{item}</option>{/each}</select></label><label class="ds-toggle"><input type="checkbox" bind:checked={showReviewOnly} /> Review only</label></div>
        <p class="ds-note" role="status">{filtered.length} of {tokens.length} tokens</p>
        <div class="ds-table-wrap"><table class="ds-table"><thead><tr><th>Token / value</th><th>Role and provenance</th><th>Status</th></tr></thead><tbody>{#each filtered as token}<tr><td><code>--{token.id}</code><br /><code>{token.value}</code></td><td>{token.note}<details><summary>Captured uses ({token.uses.length})</summary><p>{token.uses.join(", ") || "Shared primitive or documented foundation."}</p></details></td><td>{token.status}</td></tr>{/each}</tbody></table></div>
        <p class="ds-note">Source: src/lib/design-system/tokens.json and typography.json. Regenerate with bun run tokens:generate. The test suite checks generated files, references, breakpoint consistency and new un-tokenized style values.</p>
    </section>
</div>
