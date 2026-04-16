---
title: PGN & Errors
doc: vortex-chess
order: 7
---

# PGN and Error Handling

## Portable Game Notation (PGN)

The engine can import and export games in PGN format.

### Header Tags

Standard tags include:
- `Event`: Name of the tournament or match.
- `Site`: Location.
- `Date`: When the game was played.
- `Round`: Round number.
- `White`/`Black` (or `Red`/`Blue`/`Yellow`/`Green` for 4-player).
- `Result`: Game outcome.

### Error Handling

The parser is resilient to malformed PGNs but will throw descriptive errors for critical issues.

| Error Code | Meaning |
|---|---|
| `INVALID_MOVE` | The SAN move cannot be parsed or applied to the current state. |
| `STRICT_VIOLATION` | Malformed tags or syntax in strict mode. |
| `CAPACITY_EXCEEDED` | The move list exceeds internal memory limits (rare). |

## Board Validation

Before applying an imported FEN or PGN, the engine performs a "deep check" to ensure:
- Exactly one King per active player.
- No pawns on the first or last rank (relative to color).
- Active player is not in a check they cannot escape (immediate stalemate/mate).
