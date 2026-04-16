---
title: Chess Class Orchestration
doc: vortex-chess
order: 4
---

# Chess Class Orchestration

## State Management

The `Chess` class uses a linked-list of `GameState` nodes to manage history. This allows for constant-time `undo()` and `redo()` operations while maintaining the full state for repetition detection.

### Member variables

| Variable | Description |
|---|---|
| `_head` | The tail of the linked list (current state). |
| `_board` | Instance of the current `Board`. |
| `p` / `q` / `r` ... | Memoized results for performance. |

## Methods Overview

| Category | Methods |
|---|---|
| **Query** | `turn()`, `moves()`, `get()`, `history()`, `fen()`, `ascii()` |
| **Logic** | `move()`, `undo()`, `load()`, `reset()`, `clear()` |
| **Validation**| `inCheck()`, `isGameOver()`, `isDraw()` |

## Move Logic flow

1. **Normalize**: Input is converted to a move object (from-to-promotion).
2. **Validate**: Check against `moveGen` and `legality`.
3. **Apply**: `makeMove` updates the board and spawns a new `GameState` node.
4. **Clean up**: `Zobrist` hash is updated for the new state.
