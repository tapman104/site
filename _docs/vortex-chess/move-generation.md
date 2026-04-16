---
title: Move Generation
doc: vortex-chess
order: 9
---

# Move Generation (Pseudo-Legal)

## Strategy

The `MoveGen` module generates "pseudo-legal" moves. A move is pseudo-legal if:
1. The piece can physically reach the destination square according to its move pattern.
2. The destination is either empty or occupied by an enemy piece.
3. The move does not pass through other pieces (except for the Knight).

*Note: King safety is handled in the `Legality` layer.*

## Stepwise Logic

1. **Iterate**: Find all pieces belonging to the current color.
2. **Scan**: For each piece, calculate all possible target squares.
    - **Leaping (Knight/King)**: Static offsets.
    - **Sliding (Rook/Bishop/Queen)**: Incremental steps until blocked.
    - **Pawn**: Conditional steps (push, double-push, capture, en-passant).
3. **Filter**: Remove moves that target `OFF_BOARD` squares (corners in 14x14).
4. **Collect**: Return a list of `Move` objects.

## Optimization: The Piece List

Instead of scanning all 196 squares on the 14x14 board, the engine maintains a **Piece List**. This is an array of square indices containing active pieces. This allows the generator to skip 80% of empty squares on every turn.
