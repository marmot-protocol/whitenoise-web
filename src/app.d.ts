// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        // interface Locals {}
        // interface PageData {}
        interface PageState {
            guideFilters?: { platform: string; query: string };
        }
        // interface Platform {}
    }
}

export {};
