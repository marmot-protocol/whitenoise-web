<script lang="ts">
import PageIntro from "#lib/components/site/PageIntro.svelte";
import PageMeta from "#lib/components/site/PageMeta.svelte";
import Container from "#lib/components/system/Container.svelte";
import TextLink from "#lib/components/system/TextLink.svelte";
import { page } from "$app/state";
</script>

<!-- Only missing pages are noindex: a 5xx stays a retryable outage, not an exclusion. -->
<PageMeta
    title={page.status === 404 ? "Page not found" : "Something went wrong"}
    robots={page.status === 404 ? "noindex" : undefined}
/>
<Container>
    <PageIntro title={page.status === 404 ? "Page not found." : "Something went wrong."} description={page.error?.message ?? "Please try again shortly."} />
    <TextLink href="/">Back to home</TextLink>
</Container>
