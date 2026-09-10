import { writeFileSync } from "node:fs";
import { renderTokens } from "../src/lib/design-system/tokens";
import { renderTypography } from "../src/lib/design-system/typography";

writeFileSync("src/lib/design-system/tokens.css", renderTokens());
writeFileSync("src/lib/design-system/typography.css", renderTypography());
