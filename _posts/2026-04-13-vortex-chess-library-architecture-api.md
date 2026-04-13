---
title: "Vortex Chess Library: Complete Architecture & API Overview"
date: 2026-04-13 10:00:00 +0000
categories: [Engineering, Chess]
tags: [javascript, architecture, library-design, chess]
excerpt: "A deep dive into the 32-bit move encoding, three-layer architecture, and 4-player variant support of the Vortex Chess engine."
---

Vortex Chess is a robust, lightweight JavaScript chess rules library designed to handle complex move generation, legality checking, serialization, and game state management. What sets it apart is its native support for both standard 2-player chess and the complex 4-player chess variant.

Below is a detailed breakdown of its internal structure, core mechanics, and public API.

## 1. Project Structure

The codebase is organized into distinct domains separating the core engine from state management and user-facing APIs.

```text
4chess/
├── index.js                     [ Main entry point ]
├── package.json                 [ ES module, v1.0.0 ]
├── README.md                    [ API documentation ]
├── chess-engine/                [ Core Implementation ]
│   ├── index.js                 
│   ├── api/                     [ User-Facing API ]
│   │   ├── chess.js             # Main Chess class
│   │   ├── errors.js            # InvalidMove/FEN errors
│   │   ├── pgn.js               # PGN export/import
│   │   └── san.js               # SAN notation converter
│   ├── core/                    [ Engine Core ]
│   │   ├── variants.js          # STANDARD & FOUR_PLAYER configs
│   │   ├── board.js             # Board & piece storage
│   │   ├── moveGen.js           # Pseudo-legal move gen
│   │   ├── legality.js          # Legal move filtering
│   │   ├── makeMove.js          # Execution & Undo
│   │   ├── attackMap.js         # Square attack detection
│   │   └── zobrist.js           # Position hashing
│   ├── io/                      [ Serialization ]
│   │   └── fen.js               # FEN import/export
│   └── state/                   [ State Management ]
│       └── gameState.js         # Turn, castling, clocks
├── test/                        [ Test Suite ]
│   └── verify.js                # Verification tests
└── bench/                       [ Benchmarks ]
    └── perft.js                 # Nodes-per-second test
```

## 2. Architecture Overview

The library utilizes a strict three-layer architectural design, ensuring that IO parsing doesn't interfere with core board math, and state is completely separated from move generation.

### 2.1 The Three-Layer Design

```text
  +---------------------------------------------------------+
  |                      API LAYER                          |
  |  Validates user input, converts notations (SAN/PGN)     |
  |         [ chess.js ] [ pgn.js ] [ san.js ]              |
  +---------------------------------------------------------+
                               |
       (Parsed Moves / FEN)    |    (Sanitized State Data)
                               V
  +---------------------------------------------------------+
  |                     CORE ENGINE                         |
  |  Mathematical grid, pseudo/legal move gen, execution    |
  |   [ board.js ] [ moveGen.js ] [ legality.js ]           |
  +---------------------------------------------------------+
                               |
      (Board State Updates)    |    (Hash / State Checks)
                               V
  +---------------------------------------------------------+
  |                     STATE & I/O                         |
  |  Turn tracking, castling rights, Zobrist hashing        |
  |      [ gameState.js ] [ zobrist.js ] [ fen.js ]         |
  +---------------------------------------------------------+
```

### 2.2 Key Classes

*   **Chess**: The main game controller (`api/chess.js`).
*   **Board**: Handles piece storage and coordinate math (`core/board.js`).
*   **GameState**: Tracks turns, castling rights, clocks, and player status (`state/gameState.js`).
*   **MoveList**: Handles packed move integer storage (`core/moveGen.js`).

## 3. Supported Variants

### 3.1 Standard Chess (`standard@v1`)

*   **Board**: 8×8 grid
*   **Players**: 2 (White=0, Black=1)
*   **FEN**: Standard formatting
*   **Castling**: Standard `KQkq` notation

### 3.2 Four-Player Chess (`4player@v1`)

The 4-player variant features a massive 14x14 grid with 3x3 dead zones in the corners to create a cross-like battlefield.

```text
      a  b  c  d  e  f  g  h  i  j  k  l  m  n
    +------------------------------------------+
 14 |/////////|         RED (Up)     |/////////| 14
 13 |/////////| [R][N][B][K][Q][B][N][R]///////| 13
 12 |///DEAD//| [P][P][P][P][P][P][P][P]/DEAD//| 12
 11 +---------+                          +-----+ 11
 10 |   [P]                              [P]   | 10
  9 |G  [P]                              [P]  B| 9
  8 |R  [P]          CENTER              [P]  L| 8
  7 |E  [P]        BATTLEFIELD           [P]  U| 7
  6 |E  [P]                              [P]  E| 6
  5 |N  [P]                              [P]   | 5
  4 +---------+                          +-----+ 4
  3 |///DEAD//| [P][P][P][P][P][P][P][P]/DEAD//| 3
  2 |/////////| [R][N][B][Q][K][B][N][R]///////| 2
  1 |/////////|       YELLOW (Down)  |/////////| 1
    +------------------------------------------+
      a  b  c  d  e  f  g  h  i  j  k  l  m  n
```

*   **Pawn Directions**: Up (Red), Right (Blue), Down (Yellow), Left (Green).
*   **FEN**: Uses an 8-character castling field (e.g., `KQKQKQKQ` or `_`).
*   **Player Labels**: R (Red), B (Blue), Y (Yellow), G (Green).

## 4. Core Mechanics

### 4.1 32-Bit Move Encoding

To achieve high performance, moves are packed into a single 32-bit integer (`Int32`). This reduces garbage collection overhead and memory footprints during deep tree searches (like in Perft tests).

```text
 Bit: 31                         20 19      16 15        8 7         0
      +----------------------------+----------+-----------+-----------+
      |       Unused / Padding     |   Flags  | To Square |From Square|
      |          (12 bits)         | (4 bits) |  (8 bits) |  (8 bits) |
      +----------------------------+----------+-----------+-----------+
           Promo piece (Bits 20-22) ^
```

**Flag Definitions:**
*   0: QUIET (Normal move)
*   1: DOUBLE_PUSH
*   2: CASTLE_K / 3: CASTLE_Q
*   4: CAPTURE / 5: EP_CAPTURE
*   8: PROMO / 12: PROMO_CAPTURE

### 4.2 Move Generation Pipeline

1.  **Pseudo-legal generation**: `generateMoves()` evaluates board math to find all theoretical piece movements.
2.  **Legality filtering**: `getLegalMoves()` runs check-validation to filter out moves that leave/put the friendly king in check.
3.  **Make/Undo**: `makeMove()` and `unmakeMove()` mutate the board and state array with full reversibility.

### 4.3 4-Player Elimination Mechanics

Vortex natively supports the complex elimination rules of 4-way chess:

*   **King Capture**: Capturing a king instantly eliminates that player.
*   **Checkmate Elimination**: Players with no legal moves who are in check are eliminated.
*   **Stalemate**: Players with no legal moves (but not in check) are eliminated (no stalemate draws in 4P).
*   **Piece Poofing**: When a player is eliminated, all of their remaining pieces are immediately removed ("poofed") from the board.

```javascript
// Internal Execution Flow (chess.js)
if (board.variant.numPlayers > 2) {
  if (undo.captured !== Pieces.EMPTY && getType(undo.captured) === Pieces.KING) {
    const capturedColor = getColor(undo.captured);
    this._state.eliminatePlayer(capturedColor);
    const poofed = poofPieces(this._board, capturedColor);
    undo.eliminatedAtOnce.push(...poofed);
  }
  this._processCheckmateEliminations(undo); 
}
```

## 5. Public API Highlights

### 5.1 Basic Usage

```javascript
import { Chess } from 'vortex-chess';

// Standard chess
const game = new Chess();
game.move('e4');
game.move('e5');

// 4-player chess setup
const fourPlayer = new Chess({ variant: '4player' });
fourPlayer.move('e4');  // Red moves
fourPlayer.move('c7');  // Blue moves
```

### 5.2 Move Input / Output

| Input Format | Example |
| :--- | :--- |
| **SAN string** | `game.move('Nf3')` |
| **Coordinate Obj** | `game.move({ from: 'e2', to: 'e4' })` |
| **With Promotion** | `game.move({ from: 'a7', to: 'a8', promotion: 'q' })` |

**Returned Move Object:**
```json
{
  "from": "e2",
  "to": "e4",
  "piece": "p",
  "captured": undefined,
  "promotion": undefined,
  "flags": "n",
  "san": "e4",
  "color": "w"
}
```

### 5.3 Serialization

*   **FEN Management**: `game.fen()` (Export), `game.load(fen)` (Import).
*   **JSON**: Full deterministic state roundtrip via `game.toJSON()`.
*   **PGN Output**: Supports multi-player formatting: `game.pgn({ format: '4player' })`.

## 6. Advanced Engine Exports

For developers wanting to build UI components or AI bots without the overhead of the main controller:

```javascript
export { Board, Pieces } from './core/board.js';
export { GameState } from './state/gameState.js';
export { getLegalMoves, isMoveLegal, findKing, inCheck } from './core/legality.js';
export { makeMove, unmakeMove } from './core/makeMove.js';
export { computeHash } from './core/zobrist.js';
export { exportFEN, parseFEN } from './io/fen.js';
export { moveToSAN, sanToMove } from './api/san.js';
```

## 7. Key Technical Details

*   **Zobrist Hashing**: Uses 64-bit hashes with seeded RNG for twofold/threefold repetition detection.
*   **Precomputed Target Caching**: Knight and king move tables are statically cached to remove boundary offset calculations in tight loops.
*   **Directional Attack Maps**: Backward ray-tracing detection with wrap-guards for non-standard board geometries.
