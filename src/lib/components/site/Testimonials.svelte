<script lang="ts">
import { onMount } from "svelte";
import Text from "#lib/components/system/Text.svelte";
import { homepageTestimonials } from "#lib/content/homepage.js";

const pairSize = 2;
const pairs = Array.from(
    { length: Math.ceil(homepageTestimonials.length / pairSize) },
    (_, index) => homepageTestimonials.slice(index * pairSize, (index + 1) * pairSize)
);
const advanceDelay = 12000;
const visibleRatio = 0.9;
let viewport = $state<HTMLDivElement>();

onMount(() => {
    if (!viewport || pairs.length < 2) return;
    const rail = viewport;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const listeners = new AbortController();
    const { signal } = listeners;
    let timer: number | undefined;
    let inView = false;
    let heldPointer: number | undefined;

    function stop() {
        window.clearTimeout(timer);
        observer.disconnect();
        listeners.abort();
    }

    function canAdvance() {
        return !(
            signal.aborted ||
            !inView ||
            document.hidden ||
            reducedMotion.matches ||
            heldPointer !== undefined ||
            rail.scrollLeft ||
            rail.matches(":hover, :focus-within")
        );
    }

    function advance() {
        if (!canAdvance()) return;
        stop();
        rail.scrollTo({ left: rail.clientWidth, behavior: "smooth" });
    }

    function schedule() {
        window.clearTimeout(timer);
        if (canAdvance()) timer = window.setTimeout(advance, advanceDelay);
    }

    function hold(event: PointerEvent) {
        if (!event.isPrimary) return;
        heldPointer = event.pointerId;
        window.clearTimeout(timer);
    }

    function release(event: PointerEvent) {
        if (event.pointerId !== heldPointer) return;
        heldPointer = undefined;
        schedule();
    }

    const observer = new IntersectionObserver(
        ([entry]) => {
            inView = entry.intersectionRatio >= visibleRatio;
            schedule();
        },
        { threshold: visibleRatio }
    );

    // A vertical touch gesture can pass through the strip without disabling it.
    rail.addEventListener("focusin", stop, { signal });
    rail.addEventListener("pointerenter", schedule, { signal });
    rail.addEventListener("pointerleave", schedule, { signal });
    rail.addEventListener("pointerdown", hold, { signal });
    rail.addEventListener("scroll", stop, { signal, passive: true });
    document.addEventListener("pointerup", release, { signal });
    document.addEventListener("pointercancel", release, { signal });
    document.addEventListener("visibilitychange", schedule, { signal });
    reducedMotion.addEventListener("change", schedule, { signal });
    observer.observe(rail);
    return stop;
});
</script>

<section class="testimonials" id="testimonials">
    <h2 id="testimonials-heading" class="type-section">What people are saying</h2>
    <!-- svelte-ignore a11y_no_noninteractive_tabindex (The scroll container needs focus for native keyboard scrolling.) -->
    <div class="quotes" role="region" aria-labelledby="testimonials-heading" aria-describedby="testimonials-hint" tabindex="0" bind:this={viewport}>
        {#each pairs as pair (pair[0].source)}
            <div class="pair">
                {#each pair as { name, context, quote, source, avatar } (source)}
                    <figure>
                        <blockquote cite={source}>
                            <Text role="lead">“{quote}”</Text>
                        </blockquote>
                        <figcaption>
                            <a href={source}>
                                <img class="avatar" src={`/images/testimonials/${avatar}.webp`} alt="" width="48" height="48" />
                                <div>
                                    <span class="author type-ui underline">{name}</span>
                                    {#if context}
                                        <p class="type-caption tone-muted">{context}</p>
                                    {/if}
                                    <span class="sr-only">Read original source</span>
                                </div>
                            </a>
                        </figcaption>
                    </figure>
                {/each}
            </div>
        {/each}
    </div>
    <p class="hint type-caption tone-muted" id="testimonials-hint">Scroll sideways for more quotes</p>
</section>

<style>
    .testimonials {
        padding-top: var(--space-112);
    }

    h2 {
        margin-bottom: var(--space-24);
    }

    .quotes {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 100%;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        scrollbar-color: var(--color-muted) var(--color-surface);
        border-block-start: var(--stroke-hairline) solid var(--color-rule);
    }

    .quotes:focus-visible {
        outline: var(--stroke-focus) solid var(--color-ink);
        outline-offset: var(--space-4);
    }

    .hint {
        margin-block-start: var(--space-8);
    }

    @supports selector(::-webkit-scrollbar) {
        @media (forced-colors: none) {
            .quotes {
                scrollbar-color: auto;
            }

            .quotes::-webkit-scrollbar {
                height: var(--space-24);
            }

            .quotes::-webkit-scrollbar-track {
                background: var(--color-surface);
                border-block: var(--space-8) solid transparent;
                background-clip: padding-box;
            }

            .quotes::-webkit-scrollbar-thumb {
                background: var(--color-muted);
                border-block: var(--space-8) solid transparent;
                background-clip: padding-box;
            }

            .quotes::-webkit-scrollbar-button {
                display: none;
            }
        }
    }

    .pair {
        display: grid;
        grid-template-columns: var(--grid-equal-pair);
        column-gap: var(--gap-columns);
        align-content: start;
        scroll-snap-align: start;
        scroll-snap-stop: always;
    }

    figure {
        display: flex;
        flex-direction: column;
        gap: var(--space-24);
        padding-block: var(--space-32);
        min-width: 0;
    }

    blockquote {
        margin: 0;
    }

    figcaption {
        margin-block-start: auto;
    }

    figcaption a {
        position: relative;
        display: flex;
        align-items: center;
        gap: var(--space-12);
        width: fit-content;
    }

    figcaption a:focus-visible {
        outline-offset: calc(-1 * var(--stroke-focus));
    }

    .author {
        text-underline-offset: var(--space-4);
    }

    .avatar {
        display: block;
        flex: 0 0 auto;
        width: var(--space-48);
        height: var(--space-48);
        border-radius: 50%;
        background: var(--color-surface);
        object-fit: cover;
    }

    @media (max-width: 900px) {
        .testimonials {
            padding-top: var(--gap-section);
        }
    }

    @media (max-width: 640px) {
        .pair {
            grid-template-columns: var(--grid-single);
        }

        figure {
            gap: var(--space-16);
            padding-block: var(--space-24);
        }

        figure + figure {
            border-top: var(--stroke-hairline) solid var(--color-rule);
        }
    }
</style>
