import { curatedGuide } from "$lib/server/curated-guides";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => ({ document: curatedGuide("builders") });
