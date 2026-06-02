# Security Policy

## Supported Versions

| Version | Supported |
| ------- | --------- |
| 0.1.x   | Yes       |

## Report a Vulnerability

Email security reports to:

```text
drferdiiskandar@sentrahai.com
```

Do not open public issues for vulnerabilities, secrets, patient data exposure,
or crown-jewel boundary concerns.

## Data Rules

Sentra Wikirepo must remain PHI-free.

Never commit:

- `.env` files
- API keys or tokens
- patient records
- FHIR dumps with real identifiers
- local runtime databases
- proprietary `packages/sentra/**` implementation code

## Crown-Jewel Boundary

This app is `CJ-0 none`. It may describe Sentra crown jewels, but it must not
import, execute, fork, or reimplement clinical reasoning, RAG, OCR, FHIR, access
control, or embedding algorithms.
