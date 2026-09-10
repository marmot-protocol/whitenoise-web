<script lang="ts">
import { showDesignSystemLink } from "$lib/design-system/preview";
</script>
<footer class="site-footer">
    <div class="footer-bottom site-width">
        <p>© {new Date().getFullYear()} Internet Privacy Foundation</p>
        {#if showDesignSystemLink}<a class="design-system-link" href="/design-system">Design system</a>{/if}
    </div>
</footer>
