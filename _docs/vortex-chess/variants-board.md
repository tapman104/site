---
title: Variants & Board
doc: vortex-chess
order: 8
---

# Variants and Board Representation

## Board Interface

The `Board` class is responsible for the physical state of the squares. It uses a 1D array to represent the 2D grid.

### Key Metrics

| Board Type | Dimensions | Array Size | Corners Masked |
|---|---|---|---|
| **Standard** | 8 x 8 | 128 (0x88) | No |
| **Vortex 4P** | 14 x 14 | 196 | Yes (3x3 per corner) |

## Square Mapping

Squares are indexed from 0 to `WIDTH * HEIGHT - 1`.

- **Occupancy**: A square can contain a `Piece` (with color and type) or be `EMPTY`.
- **Masking**: In 4-player mode, corner squares are marked as `OFF_BOARD`. Pieces cannot move to or through these squares.

## Variant Configuration

The `variants.js` file contains the logic for switching between board types. It defines:
- Starting FEN for each variant.
- Pawn directions and promotion ranks.
- Castling rules per color.
- Coordinate parsing logic (e.g., `e4` -> square index).
