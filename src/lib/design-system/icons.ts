import Add from "carbon-icons-svelte/lib/Add.svelte";
import ArrowDown from "carbon-icons-svelte/lib/ArrowDown.svelte";
import ArrowRight from "carbon-icons-svelte/lib/ArrowRight.svelte";
import ArrowUpRight from "carbon-icons-svelte/lib/ArrowUpRight.svelte";
import Checkmark from "carbon-icons-svelte/lib/Checkmark.svelte";
import Close from "carbon-icons-svelte/lib/Close.svelte";
import Copy from "carbon-icons-svelte/lib/Copy.svelte";
import Menu from "carbon-icons-svelte/lib/Menu.svelte";

export const icons = {
    add: Add,
    down: ArrowDown,
    right: ArrowRight,
    external: ArrowUpRight,
    check: Checkmark,
    close: Close,
    copy: Copy,
    menu: Menu,
};
export type IconName = keyof typeof icons;
export const iconMeanings: Record<IconName, string> = {
    add: "Open disclosure",
    down: "Download destination",
    right: "Continue to a page",
    external: "Open an external destination",
    check: "Copy succeeded; resets after 3 seconds",
    close: "Close navigation",
    copy: "Copy the full address",
    menu: "Open navigation",
};
