---
title: Legality & Attacks
doc: vortex-chess
order: 10
---

# King safety and Attack Detection

## The Attack Map

The `AttackMap` module answers the question: "Is square X under attack by color Y?"

It is used for:
1. **Castling**: Ensuring the King does not pass through check.
2. **King Moves**: Ensuring the King does not step into check.
3. **Check Detection**: Checking if the current player's King is under attack.

## Legality Filtering

The `Legality` module transforms pseudo-legal moves into fully legal moves.

### Algorithm (The "Make-Unmake" Test)

For each pseudo-legal move:
1. **Apply**: Temporarily apply the move to the board.
2. **Scan**: Run `isSquareAttacked` on the player's King's square.
3. **Validate**:
    - If the King is attacked AFTER the move, it is ILLEGAL (pinned piece or King walking into check).
    - If the King is safe, the move is LEGAL.
4. **Revert**: Undo the move to restore the original board state.

## 4-Player Complexity

In 4-player games, a King is in check if ANY of the other three colors can capture it. `isSquareAttacked` must be called for all three opponent colors to confirm total King safety.
