---
title: SAN Notation
doc: vortex-chess
order: 6
---

# Standard Algebraic Notation (SAN)

## Overview

The engine supports the full SAN specification for both 2-player and 4-player games.

## Components of SAN

- **Piece Name**: `K`, `Q`, `R`, `B`, `N`, or empty for pawn.
- **Departure Square**: Only used for disambiguation (e.g., `Nbd2`).
- **Capture Indicator**: `x`.
- **Destination Square**: e.g., `e4`.
- **Check/Mate**: `+` or `#`.
- **Elimination**: `$` (extended for 4-player King capture).

## Special Cases

- **Castling**: `O-O` (Kingside) or `O-O-O` (Queenside).
- **Promotion**: `=Q`, `=R`, etc.
- **Multicolor elimination**: If a move results in a player being eliminated (via King capture or chained stalemate), it may be marked with the elimination symbol.
