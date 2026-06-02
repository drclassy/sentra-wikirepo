# Governance

Sentra Wikirepo is documentation infrastructure. It helps reviewers understand
ABYSS boundaries before they edit code.

## Classification

| Field                   | Value                   |
| ----------------------- | ----------------------- |
| Product classification  | `internal-operator-app` |
| Crown-jewel tier        | `CJ-0 none`             |
| Access mode             | `none`                  |
| Owns crown-jewel logic  | `No`                    |
| Direct database access  | `No`                    |

## Allowed Work

- Improve UI navigation.
- Add documented wiki routes.
- Add docs that cite canonical source files.
- Improve static verification.
- Polish responsive layout.

## Review Required

Ask for owner review before:

- Adding backend services.
- Pulling live repo files into the app.
- Adding authentication.
- Publishing private architecture content publicly.
- Changing clinical, regulatory, or partnership claims.

## Forbidden Work

- Importing `packages/sentra/**/src/**`.
- Copying diagnosis, RAG, OCR, FHIR, access-control, or embedding algorithms.
- Storing PHI or local runtime data.
- Adding secrets or environment-specific tokens.
