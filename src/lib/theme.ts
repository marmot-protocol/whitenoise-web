export type ThemePreference = "system" | "light" | "dark";

declare global {
    interface Window {
        whiteNoiseTheme?: {
            readonly preference: ThemePreference;
            readonly dark: boolean;
            toggle: () => void;
            set: (preference: ThemePreference) => void;
        };
    }
}
