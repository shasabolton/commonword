"use strict";

(() => {
  const BOARD_SIZE = 15;
  const SCORING_CARD_COUNT = 7;

  const EMOJI_BANK = [
    { symbol: "🌞", name: "sun" },
    { symbol: "🌙", name: "moon" },
    { symbol: "⭐", name: "star" },
    { symbol: "⚡", name: "lightning" },
    { symbol: "🔥", name: "fire" },
    { symbol: "💧", name: "water" },
    { symbol: "🌊", name: "wave" },
    { symbol: "🌈", name: "rainbow" },
    { symbol: "❄️", name: "snow" },
    { symbol: "🌪️", name: "tornado" },
    { symbol: "🌵", name: "cactus" },
    { symbol: "🌲", name: "tree" },
    { symbol: "🌻", name: "flower" },
    { symbol: "🍄", name: "mushroom" },
    { symbol: "🍎", name: "apple" },
    { symbol: "🍌", name: "banana" },
    { symbol: "🍇", name: "grapes" },
    { symbol: "🍓", name: "strawberry" },
    { symbol: "🍕", name: "pizza" },
    { symbol: "🍔", name: "burger" },
    { symbol: "🍟", name: "fries" },
    { symbol: "🍩", name: "donut" },
    { symbol: "🍿", name: "popcorn" },
    { symbol: "⚽", name: "soccer" },
    { symbol: "🏀", name: "basketball" },
    { symbol: "🎾", name: "tennis" },
    { symbol: "🎲", name: "dice" },
    { symbol: "🎯", name: "target" },
    { symbol: "🎸", name: "guitar" },
    { symbol: "🎧", name: "headphones" },
    { symbol: "🎬", name: "movie" },
    { symbol: "🎨", name: "paint" },
    { symbol: "🚗", name: "car" },
    { symbol: "🚲", name: "bicycle" },
    { symbol: "🚀", name: "rocket" },
    { symbol: "✈️", name: "airplane" },
    { symbol: "🚢", name: "ship" },
    { symbol: "🏠", name: "house" },
    { symbol: "🏰", name: "castle" },
    { symbol: "🗽", name: "statue" },
    { symbol: "⌚", name: "watch" },
    { symbol: "📚", name: "books" },
    { symbol: "✏️", name: "pencil" },
    { symbol: "💡", name: "bulb" },
    { symbol: "🔑", name: "key" },
    { symbol: "🔔", name: "bell" },
    { symbol: "🎁", name: "gift" },
    { symbol: "💎", name: "gem" },
    { symbol: "👑", name: "crown" },
    { symbol: "🧲", name: "magnet" },
    { symbol: "🐶", name: "dog" },
    { symbol: "🐱", name: "cat" },
    { symbol: "🦊", name: "fox" },
    { symbol: "🐻", name: "bear" },
    { symbol: "🐼", name: "panda" },
    { symbol: "🦁", name: "lion" },
    { symbol: "🐵", name: "monkey" },
    { symbol: "🐸", name: "frog" },
    { symbol: "🐝", name: "bee" },
    { symbol: "🦋", name: "butterfly" },
    { symbol: "🐙", name: "octopus" },
    { symbol: "🐳", name: "whale" },
    { symbol: "🦖", name: "dinosaur" },
    { symbol: "❤️", name: "heart" },
    { symbol: "😊", name: "smile" },
    { symbol: "🤖", name: "robot" },
    { symbol: "👻", name: "ghost" },
    { symbol: "🧠", name: "brain" },
    { symbol: "🧭", name: "compass" },
    { symbol: "🪁", name: "kite" },
  ];

  const boardElement = document.querySelector("#board");
  const revealToggle = document.querySelector("#revealToggle");
  const newGameButton = document.querySelector("#newGame");
  const scoreElement = document.querySelector("#score");

  let cards = [];
  let score = 0;
  let scoresRevealed = false;
  let gameOver = false;

  function shuffle(items) {
    const shuffled = [...items];

    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
    }

    return shuffled;
  }

  function createCards() {
    const emojiChoices = shuffle(EMOJI_BANK).slice(0, BOARD_SIZE);
    const roles = shuffle([
      "danger",
      ...Array.from({ length: SCORING_CARD_COUNT }, () => "one"),
      ...Array.from({ length: BOARD_SIZE - SCORING_CARD_COUNT - 1 }, () => "zero"),
    ]);

    return emojiChoices.map((emoji, index) => {
      const kind = roles[index];

      return {
        id: `emoji-${index}`,
        symbol: emoji.symbol,
        name: emoji.name,
        kind,
        points: kind === "one" ? 1 : 0,
        selected: false,
      };
    });
  }

  function valueLabel(card) {
    if (card.kind === "danger") {
      return "Game over";
    }

    return `${card.points} point${card.points === 1 ? "" : "s"}`;
  }

  function isVisible(card) {
    return scoresRevealed || card.selected || gameOver;
  }

  function renderBoard() {
    boardElement.replaceChildren(
      ...cards.map((card, index) => {
        const button = document.createElement("button");
        const visible = isVisible(card);

        button.type = "button";
        button.className = [
          "card",
          `kind-${card.kind}`,
          visible ? "revealed" : "",
          card.selected ? "selected" : "",
        ]
          .filter(Boolean)
          .join(" ");
        button.disabled = gameOver || card.selected;
        button.setAttribute(
          "aria-label",
          `${card.name} emoji${visible ? `, ${valueLabel(card)}` : ""}${
            card.selected ? ", selected" : ""
          }`,
        );
        button.addEventListener("click", () => selectCard(index));

        const emoji = document.createElement("span");
        emoji.className = "emoji";
        emoji.textContent = card.symbol;

        button.append(emoji);
        return button;
      }),
    );
  }

  function setRevealState(nextState) {
    scoresRevealed = nextState;
    revealToggle.setAttribute("aria-pressed", String(scoresRevealed));
    revealToggle.setAttribute(
      "aria-label",
      scoresRevealed ? "Hide scoring cards" : "Show scoring cards",
    );
    revealToggle.textContent = "👁";
    renderBoard();
  }

  function updateScoreSummary() {
    scoreElement.textContent = String(score);
  }

  function selectCard(index) {
    const card = cards[index];

    if (!card || card.selected || gameOver) {
      return;
    }

    card.selected = true;

    if (card.kind === "danger") {
      gameOver = true;
      setRevealState(true);
    } else {
      score += card.points;
      renderBoard();
    }

    updateScoreSummary();
  }

  function startNewGame() {
    cards = createCards();
    score = 0;
    gameOver = false;
    setRevealState(false);
    updateScoreSummary();
  }

  revealToggle.addEventListener("click", () => {
    if (gameOver) {
      return;
    }

    setRevealState(!scoresRevealed);
  });

  newGameButton.addEventListener("click", startNewGame);

  startNewGame();

  window.Commonword = {
    createCards,
    shuffle,
  };
})();
