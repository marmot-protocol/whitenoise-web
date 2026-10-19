# Contribute

Marmot work is spread across several public repositories. Pick the one that matches your change, and read its README first for build and contribution notes.

| Area | Repository |
|---|---|
| Protocol specification | [marmot-protocol/marmot](https://github.com/marmot-protocol/marmot) |
| Rust MDK and agent integrations | [marmot-protocol/mdk](https://github.com/marmot-protocol/mdk) |
| TypeScript library | [marmot-protocol/marmot-ts](https://github.com/marmot-protocol/marmot-ts) |
| Website content | [marmot-protocol/whitenoise-web](https://github.com/marmot-protocol/whitenoise-web) |

If you hit a problem while using the app, start with [Report a problem](/docs/troubleshooting/report-problem).

## Before you share anything

Issues are public. Remove these details before you post:

- Private keys and tokens
- Peer public keys
- Group and message identifiers, plus message text
- Screenshots that show other people's conversations

If you think you have found a security vulnerability, look for a security policy in the repository before you post any details.

## Writing a useful report

1. Name the repository and give the full commit SHA.
2. Include your toolchain version and operating system, along with the exact command you ran and its complete output.
3. Describe what you expected, then what happened instead.
4. Note any external effects, such as messages that may already have been sent.

## Changing code or docs

- Keep each change focused on one problem.
- Report only results you saw yourself. Label a focused test group as focused, and list it apart from any full-suite or device results.
- In documentation, link to the public source behind each claim and say what is still untested.

## Expected result

Maintainers can reproduce the problem using only the public details in your report.
