export type GuideSection = {
    name: string;
    html: string;
    afterHtml: string;
    prompt?: string;
};

/** A page renders either one article or sections with copyable prompts, never both. */
export type GuideDocument = { title: string } & (
    | { html: string; sections?: never }
    | { sections: GuideSection[]; html?: never }
);
