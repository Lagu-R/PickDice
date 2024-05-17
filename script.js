'use strict';
/* 
  this project is about roll dice game.
  2 players compete against each other
  The first to reach 100 points wins🥇.
  The principle is that if the dice gets a value of 1 point, 
  it loses the point accumulated at that moment, 
  but it has the opportunity to save it every time 
  it is rolled and not risk it.
(Whoever risks it will drink champagne from the bottle)🍾🏆😎
*/
// ------------------------------------- //

// Declare constants
// Player consts
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const activePlayerStyle = 'player--active';
// Score && Current score of player
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

const current0Score = document.getElementById('current--0');
const current1Score = document.getElementById('current--1');

const score = [0, 0];
// Dice img
const diceEl = document.querySelector('.dice');
// Buttons
const rollDice = document.querySelector('.btn--roll');
const btnNewGame = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
// ------------------------------------- //

// ... STARTING CONDITIONS ...
// reset scores
score0El.textContent = 0;
score1El.textContent = 0;
//NOTE hide dice until game starts
diceEl.classList.add('hidden');
// ------------------------------------- //
//Current score until hold.
let currScore = 0;
// player numeric value ( Player 1 =  0 , Player 2 = 1 )
let activePlayer = 0;
/* if the game and components are ON . 
when player when everythin must stop until Restart the game. */
let isGameOn = true;
// ------------------------------------- //
// here is a function which avoid repeat code and help to switch player
const switchPlayer = function () {
  /* 
    there is a EZ way to make this but not mine 😭 : 
    ----------------------------------------------------------
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      currScore = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      player0.classList.toggle(activePlayerStyle);
      player1.classList.toggle(activePlayerStyle);
    ----------------------------------------------------------
    down below is the code written by me ... but (my!)
    */
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  if (activePlayer == 0) {
    activePlayer = 1;
    currScore = 0;
    player0.classList.remove(activePlayerStyle);
    player1.classList.add(activePlayerStyle);
  } else {
    activePlayer = 0;
    currScore = 0;
    player1.classList.remove(activePlayerStyle);
    player0.classList.add(activePlayerStyle);
  }
};
// ------------------------------------- //

const rollADice = function () {
  if (isGameOn) {
    //TODO - generate random dice roll DONE
    const dice = Math.floor(Math.random() * 6) + 1; // random numb 1-6

    //TODO - display dice DONE
    diceEl.classList.remove('hidden'); // appear dice img

    //TODO - Add dice roll value to current score and display it DONE
    diceEl.src = `dice-${dice}.png`; // ImgName based on generated number and hange img

    // increse score if <> 1
    if (dice !== 1) {
      currScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currScore; //FIXMEDONE
    } else {
      // otherwise Switch the player
      switchPlayer();
    }
  }
};
// ------------------------------------- //
rollDice.addEventListener('click', rollADice);
// ------------------------------------- //

btnHold.addEventListener('click', function () {
  if (isGameOn) {
    // add current score to total score
    score[activePlayer] += currScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    // if socre >= 100 then WIN otherwise switch player.
    if (score[activePlayer] >= 10) {
      // hide dice
      diceEl.classList.add('hidden');
      // change background of WINNER PLAYER
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      // AVOID next step which is active next player.
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      /* 
        turn of isGameOn Boolean cus this control our game buttons
        If someone is intriguer and press maybe find the bugs 😜(anti-intrigue)
        */
      isGameOn = false;
    } else {
      switchPlayer();
    }
  }
});
// ------------------------------------- //
/* 
  when user click the New Game button 
  Everything should be returned to the 
  starting condition. set all scores 0
  And the player will be ready to try a 
  new experience that will not be forgotten 🥹🥰
*/
btnNewGame.addEventListener('click', function () {
  // set all scores 0
  currScore = 0;
  score[0] = 0;
  score[1] = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;

  current0Score.textContent = 0;
  current1Score.textContent = 0;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

  // set player 1 as starting player
  activePlayer = 0;
  isGameOn = true;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
});
