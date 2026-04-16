---
title: Multi-player Logic
doc: vortex-chess
order: 5
---

# Multi-player Elimination Logic

## Core Rules

In 4-player Vortex Chess, players are eliminated under two conditions:
1. **King Capture**: Their king is physically captured by another piece.
2. **Stalemate/Checkmate**: They have no legal moves on their turn.

## Chained Eliminations

Elimination is a recursive process. When it is a player's turn, the engine checks if they have any legal moves. If they don't, they are eliminated, and the engine immediately checks the *next* player's legal moves.

This can lead to "chained eliminations" where multiple players are knocked out in a single turn cycle.

## State Transitions

When a player is eliminated:
- `isEliminated[color]` is set to `true`.
- All pieces belonging to that color are removed from the board (`poofPieces`).
- The turn count is updated to the next active player.
- The FEN string is updated to reflect the new board state.
