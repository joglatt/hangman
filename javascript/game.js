var wins = 0;
var words = ["apple", "orange", "pear", "mango"];
var currentWord =[]; 
var hiddenWord = [];
var lettersUsed = [];
var correctGuesses = [];
var remainingGuesses = 7;
function setWord(){
  currentWord = words[Math.floor(Math.random() * words.length)];
};
function reset(){
  // Must add win mechanic. If hiddenword = currentword?
  if (remainingGuesses === 0){
    alert("You lose. Within the dark construct of Hangman, that means you are dead.");
    remainingGuesses = 7;
    wins=0
    setWord();
    correctGuesses=[];
    lettersUsed=[];
  }else if(currentWord==hiddenWord){
    alert("You won; count your blessings.")
    remainingGuesses = 7;
    wins++;
    setWord();
    correctGuesses=[];
    lettersUsed=[];
  }
}
setWord();
document.onkeyup = function(event) {
  var guess = event.key;
  

  if (event.keyCode >= 65 && event.keyCode <= 90){
  if (
    lettersUsed.includes(guess) === false &&
    correctGuesses.includes(guess) === false
  ) {
    if (currentWord.includes(guess) === false) {
      console.log("incorrect");
      lettersUsed.push(guess);
      remainingGuesses--;
    } else if (currentWord.includes(guess) === true) {
      for (i = 0; i < currentWord.length; i++){
        
      }
      correctGuesses.push(guess);
    }
  }
  reset()
}

  var html =
  "<p>tester: " +
  currentWord +
  "</p>" +
  "<p>Wins: " +
  wins +
  "</p>" +
  "<p>Hidden Word: " +
  hiddenWord +
  "</p>" +
  "<p>Guesses Remaining: " +
  remainingGuesses +
  "</p>" +
  "<p>Letters Used: " +
  lettersUsed +
  "</p>";

document.querySelector("#game").innerHTML = html;
};
