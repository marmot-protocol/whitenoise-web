import { hydrate } from "svelte";
import RelayPage from "./RelayPage.svelte";

const target = document.getElementById("relay-page");
if (target) {
    hydrate(RelayPage, {
        target,
        props: { region: target.dataset.region === "eu" ? "eu" : "us" },
    });
}
