import { Marked } from "marked";
import agents from "$lib/content/agents.md?raw";
import builders from "$lib/content/build.md?raw";
import type { GuideDocument } from "$lib/content/guide";
import marmot from "$lib/content/marmot.md?raw";
import type { GuideArea } from "$lib/documentation-navigation";
import { renderDocumentation } from "./docs-markdown";

// The curated Agents Markdown owns both the guide and its copyable prompts,
// including the text export. Only top-level setup fences become controls.
function renderAgentGuide(): GuideDocument {
    const sections: { name: string; markdown: string; afterMarkdown: string; prompt?: string }[] =
        [];
    let section: (typeof sections)[number] = {
        name: "Getting started",
        markdown: "",
        afterMarkdown: "",
    };
    let hasHeading = false;
    for (const token of new Marked().lexer(agents)) {
        if (token.type === "heading" && token.depth === 2) {
            if (hasHeading) {
                sections.push(section);
                section = { name: token.text, markdown: "", afterMarkdown: "" };
            } else {
                section.name = token.text;
                hasHeading = true;
            }
        }
        if (token.type === "code" && token.lang === "agent-setup") {
            section.prompt = token.text;
        } else if (section.prompt !== undefined) {
            section.afterMarkdown += token.raw;
        } else {
            section.markdown += token.raw;
        }
    }
    if (section.markdown.trim()) sections.push(section);
    let title = "Agents";
    const renderedSections = sections.map(({ name, markdown, afterMarkdown, prompt }, index) => {
        const rendered = renderDocumentation(markdown);
        if (index === 0) title = rendered.title;
        return {
            name,
            html: rendered.html,
            afterHtml: afterMarkdown ? renderDocumentation(afterMarkdown).html : "",
            prompt,
        };
    });
    return { title, sections: renderedSections };
}

function renderArticle(markdown: string): GuideDocument {
    const { title, html } = renderDocumentation(markdown);
    return { title, html };
}

// These bundled sources change only with a new build. Render once per server instance
// and send only the content the page displays, without a duplicate full Agents article.
const guides: Record<GuideArea, GuideDocument> = {
    agents: renderAgentGuide(),
    builders: renderArticle(builders),
    marmot: renderArticle(marmot),
};

export function curatedGuide(area: GuideArea): GuideDocument {
    return guides[area];
}
