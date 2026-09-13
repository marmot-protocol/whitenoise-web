// Runs in the head before page content paints. Keep this small and independent of hydration.
(() => {
    const key = "wn-theme";
    const root = document.documentElement;
    const system = window.matchMedia("(prefers-color-scheme: dark)");
    /** @param {unknown} value @returns {import('../src/lib/theme').ThemePreference} */
    const normalize = (value) => (value === "light" || value === "dark" ? value : "system");
    let preference = normalize(null);
    try {
        preference = normalize(localStorage.getItem(key));
    } catch {
        // Storage may be unavailable; system appearance still works.
    }

    function apply() {
        root.dataset.theme = preference;
        const color = getComputedStyle(root).getPropertyValue("--color-paper").trim();
        for (const meta of document.querySelectorAll('meta[name="theme-color"]')) {
            meta.setAttribute("content", color);
        }
        const dark = preference === "dark" || (preference === "system" && system.matches);
        for (const icon of document.querySelectorAll("link[data-theme-icon]")) {
            const href = dark ? icon.dataset.darkIcon : icon.dataset.lightIcon;
            if (icon.getAttribute("href") !== href) icon.setAttribute("href", href);
        }
        window.dispatchEvent(new Event("wn-theme-change"));
    }

    window.whiteNoiseTheme = {
        get preference() {
            return preference;
        },
        get dark() {
            return preference === "dark" || (preference === "system" && system.matches);
        },
        toggle() {
            this.set(this.dark ? "light" : "dark");
        },
        set(value) {
            preference = normalize(value);
            try {
                if (preference === "system") localStorage.removeItem(key);
                else localStorage.setItem(key, preference);
            } catch {
                // An explicit choice still applies for this page when storage is blocked.
            }
            apply();
        },
    };
    window.addEventListener("storage", (event) => {
        if (event.key !== key && event.key !== null) return;
        try {
            if (event.storageArea !== localStorage) return;
        } catch {
            return;
        }
        preference = normalize(event.newValue);
        apply();
    });
    system.addEventListener("change", () => {
        if (preference === "system") apply();
    });
    apply();
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", apply, { once: true });
    }
})();
