# Ticket Triage AI

AI-powered support ticket classifier using local NLP heuristics. No external APIs.

## Quick Start
```bash
docker-compose up --build
```

- UI: http://localhost:3000  
- API: http://localhost:4000

## Architecture

**Separation of concerns:**
- `config/keywords.js` — all classification rules in one place (config-driven)
- `analyzer/classifier.js` — pure NLP logic, no DB dependency
- `services/ticketService.js` — orchestrates analyze + persist
- `controllers/ticketController.js` — HTTP layer only (validation, response)

## API Reference

### POST /tickets/analyze
Body: `{ "message": "string" }`  
Returns: `{ category, priority, isUrgent, keywords, signals, confidence, securityFlag }`

### GET /tickets
Returns: Array of last 50 tickets, newest first.

## Data Model

SQLite table `tickets` — chosen because it requires zero infrastructure, runs inside Docker with a volume mount, and is sufficient for the scale of this assignment.

## Classification Approach

Keyword-based scoring: each category has a word list. The category with the most keyword hits wins. Priority is determined by a separate severity signals config, checked in P0→P3 order (first match wins).

**Confidence score**: `min(total_keyword_matches / 5, 1.0)` — a rough heuristic. More matches = higher confidence.

## Custom Rule — Security Escalation

Any ticket containing security-related terms (hacked, breach, compromised, phishing, etc.) is **automatically escalated to P0**, regardless of category, and gets a `securityFlag: true` in the response. The UI displays a red banner for these.

**Rationale**: Security incidents require immediate human review. Missing one is far worse than a false positive. By treating it as a hard override rather than just another scored keyword, we ensure zero security threats slip through at lower priority.

## Reflection

**Design decisions**: SQLite over Postgres removes infra complexity for a local-only app. Config-driven keywords means adding a new category requires zero code changes. The analyzer is a pure function — easy to unit test and easy to swap for an ML model later.

**Trade-offs**: Keyword matching has no semantic understanding. "Not broken" would still match "broken". Confidence score is a rough heuristic, not a probability.

**Limitations**: No authentication, no rate limiting, no pagination on GET /tickets, no ticket status workflow (open/closed/resolved).

**What I'd improve**: Replace keyword scoring with TF-IDF or a lightweight embedding model (e.g. sentence-transformers running locally). Add ticket status management. Add pagination and search. Write integration tests for the full API layer.

## Tests
```bash
cd backend && npm test
```

13 unit tests covering category detection, priority assignment, urgency detection, and the custom security rule.
