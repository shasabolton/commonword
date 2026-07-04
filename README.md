# Commonword

A client-side vanilla JavaScript clue game where one player gives a common-word
clue that links multiple emojis and the other player guesses from a hidden board.

## Play

Open `index.html` in a browser. No build step, server, or dependencies are
required.

## Rules

- A random 5x5 emoji board is generated for each new game.
- One emoji is assigned as instant game over.
- Half of the remaining emojis are worth 1 point each.
- The rest are worth 0 points.
- The clue giver can toggle **Reveal scores** to see the hidden point values.
- After making a clue, hide the scores and let the guesser pick emojis.
- Picked emojis stay bordered and keep their values revealed.
- Picking a 1-point emoji increases the score.
- Picking the instant game-over emoji ends the game and reveals the board.
