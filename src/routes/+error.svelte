<script lang="ts">
import PageIntro from "#lib/components/site/PageIntro.svelte";
import Container from "#lib/components/system/Container.svelte";
import TextLink from "#lib/components/system/TextLink.svelte";
import { page } from "$app/state";
</script>

<svelte:head>
    <title>{page.status} | White Noise</title>
    <meta name="robots" content="noindex" />
</svelte:head>
<Container>
    <PageIntro title={page.status === 404 ? "Page not found." : "Something went wrong."} description={page.error?.message ?? "Please try again shortly."} />
    <TextLink href="/">Back to home</TextLink>
</Container>
