import agents from "$lib/content/agents.md?raw";
import build from "$lib/content/build.md?raw";
import { faqGroups } from "$lib/content/faqs";
import marmot from "$lib/content/marmot.md?raw";
import overview from "$lib/content/overview.md?raw";

export const prerender = true;
export function GET() {
    const faq = faqGroups
        .map(
            (group) =>
                `## ${group.title}\n\n${group.items
                    .map(
                        (item) =>
                            `### ${item.question}\n\n${item.answer}${item.link ? `\n\n[${item.link.label}](${new URL(item.link.href, "https://www.whitenoise.chat").href})` : ""}`
                    )
                    .join("\n\n")}`
        )
        .join("\n\n");
    return new Response(
        [overview, "# Frequently asked questions", faq, agents, build, marmot].join("\n\n"),
        {
            headers: { "Content-Type": "text/plain; charset=utf-8" },
        }
    );
}
