import { render } from "svelte/server";
import RelayPage from "./RelayPage.svelte";

export function renderPage(template: string, region: "us" | "eu") {
    const page = render(RelayPage, { props: { region } });
    return template
        .replace("<!--relay-head-->", page.head)
        .replace("<!--relay-body-->", page.body)
        .replace('data-region="us"', `data-region="${region}"`);
}
