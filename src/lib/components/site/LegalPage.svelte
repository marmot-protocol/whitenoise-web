<script lang="ts">
let {
    introductionHtml,
    sectionsHtml,
    sections,
}: {
    introductionHtml: string;
    sectionsHtml: string;
    sections: { id: string; title: string }[];
} = $props();
</script>

<div class="site-width">
    <article class="legal-policy article-body">
        {@html introductionHtml}
        <nav class="legal-contents" aria-label="Table of contents">
            <p class="type-title">On this page</p>
            <ul>
                {#each sections as section (section.id)}
                    <li><a href={`#${section.id}`}>{section.title}</a></li>
                {/each}
            </ul>
        </nav>
        {@html sectionsHtml}
    </article>
</div>
