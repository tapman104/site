---
title: Public API Contract
doc: vortex-chess
order: 3
---

# Public Contract vs Advanced Entry Points

## Overview

The `vortex-chess-library` exposes a tiered API. Most users will only interact with the `Chess` class, while engine developers and UI implementers might need the lower-level core modules for custom variants or performance-sensitive move generation.

## Tier 1: The Chess Class (Recommended)

The `Chess` class is the primary entry point. it manages state, history, and notation.

```javascript
import { Chess } from 'vortex-chess-library';

const game = new Chess();
game.move('e4');
console.log(game.ascii());
```

## Tier 2: Core Modules (Advanced)

Core modules provide the building blocks for the engine.

- **Board**: Raw square data and piece lists.
- **MoveGen**: Pseudo-legal move production.
- **Legality**: King safety and check detection.
- **AttackMap**: Square-level attack scanning.

## Tier 3: IO and State

- **FEN**: String serialization and parsing.
- **PGN**: Game history import/export.
- **Zobrist**: Hashing for repetition detection.
