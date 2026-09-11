import { error, redirect } from "@sveltejs/kit";
import { agentRuntimes } from "$lib/documentation";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ params }) => {
    if (!agentRuntimes.some((runtime) => runtime === params.runtime))
        error(404, "Agent guide not found");
    redirect(307, `/agents#${params.runtime}`);
};
