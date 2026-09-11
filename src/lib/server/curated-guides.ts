import agents from "$lib/content/agents.md?raw";
import builders from "$lib/content/build.md?raw";
import marmot from "$lib/content/marmot.md?raw";
import type { GuideArea } from "$lib/documentation-navigation";
import { renderDocumentation } from "./docs-markdown";

const markdown = { agents, builders, marmot };
export function curatedGuide(area: GuideArea) {
    return renderDocumentation(markdown[area], { repo: "mdk", path: "README.md" }, new Set(), {
        keepExternalLinks: true,
    });
}
