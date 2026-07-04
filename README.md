# Commonword

This is a client-side vanilla JavaScript emoji guessing game.

## Play

Open `index.html` in a browser. No build step, server, or dependencies are
required.

## Rules

- A random 3x7 emoji board is generated for each new game.
- One emoji is assigned as instant game over.
- Half of the remaining emojis are worth 1 point each.
- The rest are worth 0 points.
- Use the eye button to show or hide the scoring emojis.
- Scoring emojis are highlighted yellow when shown.
- Picked emojis stay bordered and keep their score state revealed.
- Picking a 1-point emoji increases the score.
- Picking the instant game-over emoji ends the game and reveals the board.
