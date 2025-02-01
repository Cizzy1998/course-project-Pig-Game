'use strict';

// ========= DOM Elements ========= //

// Player 0 and Player 1
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// Score IDs
const score0El = document.getElementById('score--0'); // Same with below but slower since
const score1El = document.getElementById('score--1'); // Same with above but faster since it's using id

// Current Score IDs
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

// Dice PNG
const diceEl = document.querySelector('.dice');

// Buttons
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// ========= Variables ========= //
let playing, scores, currentScore, activePlayer;

// Start / Initializing Function
const init = function () {
  // Values
  playing = true;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  // Values - UI Initialization
  score0El.textContent = scores[0];
  score1El.textContent = scores[1];
  current0El.textContent = currentScore;
  current1El.textContent = currentScore;
  // UI Class Update
  player0El.classList.remove('player--winner'); // Remove winner class
  player1El.classList.remove('player--winner'); // Remove winner class
  player0El.classList.add('player--active'); // Add active class for Player 1
  player1El.classList.remove('player--active'); // Remove active class for Player 2
  // Hide Dice
  diceEl.classList.add('hidden');
  // Show Buttons
  btnRoll.classList.remove('hidden');
  btnHold.classList.remove('hidden');
};

// Initialize the game
init();

const switchPlayer = function () {
  // Switch to next player
  document.getElementById('current--' + activePlayer).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling Dice Functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1: If true, switch to next player
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById('current--' + activePlayer).textContent =
        currentScore;
    } else switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 50) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      diceEl.classList.add('hidden');
      btnRoll.classList.add('hidden');
      btnHold.classList.add('hidden');
    }
    // Finish the game
    // Switch to the next player
    switchPlayer();
  }
});

btnNew.addEventListener('click', function () {
  init();
});
