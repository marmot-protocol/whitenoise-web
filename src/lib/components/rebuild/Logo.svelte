<script lang="ts">
let { hero = false } = $props<{ hero?: boolean }>();
</script>

<img
    class:hero-mark={hero}
    class="wn-mark"
    src="/images/logomark.svg"
    alt={hero ? "White Noise" : ""}
    width="58"
    height="44"
/>
