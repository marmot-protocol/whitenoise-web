import { curatedGuide } from "#lib/server/curated-guides.js";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => ({ document: curatedGuide("agents") });
