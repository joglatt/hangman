var music = document.getElementById("myAudio");
var x = document.getElementById("myAudio");

function playAudio() {
  x.play();
}

function pauseAudio() {
  x.pause();
}
var wins = 0;
var words = [
  "outlaw",
  "revolver",
  "spurs",
  "desperado",
  "sheriff",
  "lasso",
  "longhorn",
  "cattle",
  "frontier",
  "gallop",
  "gunslinger"
  
];
var currentWord = [];
var hiddenWord = [];
var lettersUsed = [];
var correctGuesses = [];
var remainingGuesses = 7;

function image() {
  if (remainingGuesses === 7) {
    document.getElementById("deadman").src = "assets/0.jpg";
  } else if (remainingGuesses === 6) {
    document.getElementById("deadman").src = "assets/1.jpg";
  } else if (remainingGuesses === 5) {
    document.getElementById("deadman").src = "assets/2.jpg";
  } else if (remainingGuesses === 4) {
    document.getElementById("deadman").src = "assets/3.jpg";
  } else if (remainingGuesses === 3) {
    document.getElementById("deadman").src = "assets/4.jpg";
  } else if (remainingGuesses === 2) {
    document.getElementById("deadman").src = "assets/5.jpg";
  } else if (remainingGuesses === 1) {
    document.getElementById("deadman").src = "assets/6.jpg";
  } else if (remainingGuesses === 0) {
    document.getElementById("deadman").src = "assets/7.jpg";
  }
}
// sets random word and creates array with blanks for hidden word.
function setWord() {
  currentWord = words[Math.floor(Math.random() * words.length)];
  // Must clear because loop will not overwrite letters from a previous word longer than the new word
  // The letters used were not clearing from previous game until first guess
  hiddenWord = [];
  lettersUsed=[];
  for (i = 0; i < currentWord.length; i++) {
    //  loop over word to create hidden word
    hiddenWord[i] = "_";
  }
  // printing display of game
  printGame(currentWord, wins, hiddenWord, remainingGuesses, lettersUsed);
}

// function to display content

function printGame(
  currentWord,
  wins,
  hiddenWord,
  remainingGuesses,
  lettersUsed
) {
  var html =
    "<p>tester: " +
    currentWord +
    "</p>" +
    "<p>Wins: " +
    wins +
    "</p>" +
    "<p>Hidden Word: " +
    hiddenWord.join(" ") +
    "</p>" +
    "<p>Guesses Remaining: " +
    remainingGuesses +
    "</p>" +
    "<p>Letters Used: " +
    lettersUsed +
    "</p>";

  document.querySelector("#game").innerHTML = html;
}

// resets game and game logic for determining winning and losing
function reset() {
  if (remainingGuesses === 0) {
    alert("You done got strung up there partner.");
    remainingGuesses = 7;
    wins = 0;
    setWord();
    correctGuesses = [];
    lettersUsed = [];
    document.getElementById("deadman").src = "assets/0.jpg";
  } else if (hiddenWord.join("") === currentWord) {
    alert(
      "You got lucky this time greenhorn. Why don't ya'll git while the gitting is good?"
    );
    remainingGuesses = 7;
    wins++;
    setWord();
    correctGuesses = [];
    lettersUsed = [];
    document.getElementById("deadman").src = "assets/0.jpg";
  }
}

// Sets new word
setWord();
//key up function for everything triggered on a guess
document.onkeyup = function(event) {
  var guess = event.key.toLowerCase();
  //only allows letters
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    //does not allow duplicate guesses
    if (!lettersUsed.includes(guess) && !correctGuesses.includes(guess)) {
      // if a guessed letter is within the word, log correct.
      if (currentWord.includes(guess)) {
        console.log("correct");
        //loop through the word to find where the guessed letter is, replace the blank in the hidden word, add the guerss to array of correct guesses
        for (j = 0; j < currentWord.length; j++)
          if (currentWord[j] === guess) hiddenWord[j] = guess;
        correctGuesses.push(guess);
        //updates game display
        printGame(currentWord, wins, hiddenWord, remainingGuesses, lettersUsed);
        //changes pictue as guesses remaining drop
        image();
        //checks to see if player won and if game restarts
        reset();
        //if it is not a correct guess, log incorrect, add the guess to the array of used words, deincrement remaining guesses,
      } else {
        console.log("incorrect");
        lettersUsed.push(guess);
        remainingGuesses--;
        //update game display, and check if the player lost
        printGame(currentWord, wins, hiddenWord, remainingGuesses, lettersUsed);
        //changes pictue as guesses remaining drop
        image();
        reset();
      }
    }
  }
};
