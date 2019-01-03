/*
 ________________________________
|                                |
|      Hangman | Star Wars       |
|________________________________|

*/

/*
To-do:
    - Add more words/clues
*/

/*
======================================
Global Variables
======================================
*/

// Word Bank
var wordBank = ["DROID",
                "HOTH",
                "TAUNTAUN",];

// Clue Bank
var clueBank = ["Their kind aren't welcome here.",
                "Snow day!",
                "They may smell bad kid, but they'll keep you warm."];

// Letter Pressed by User
var letterPressed;

// Array to push guessed letters to
var lettersGuessed = [];

// Random Word Choice from Word Bank Array
var randomWord;

// Guesses remaining
var guessesRemaining = document.getElementById("guesses-remaining");

// Spans to use for blank space generation
var newSpan = document.createElement("span");

// Win/Loss Counters
var wins = 0;
var losses = 0;

// Stores boolean of "has a new letter been pressed"
var wrongGuess = true;

/*
======================================
Event Listeners
======================================
*/

// Listen for Key Press (A-Z Only) | Store Letter in Uppercase
document.onkeyup = function() {
    // Separate this out into a helper function?
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        var keyPressed = String.fromCharCode(event.keyCode).toUpperCase();
        letterPressed = keyPressed;
        console.log(letterPressed);

        // Display Letters Pressed
        displayLettersPressed(letterPressed, lettersGuessed);

        // Reset wrongGuess
        wrongGuess = true;

        // Reveal Letters
        revealLetters(randomWord, letterPressed);

        // Has won?
        hasWon(randomWord);

        // // Subtract Guess
        // subtractGuess();

        if (wrongGuess) {
            subtractGuess();
        };


    };
};

// Event listener for New Game Buttons
document.getElementById("win-button").onclick = function() {
    newGame();
};

document.getElementById("loss-button").onclick = function () {
    newGame();
};

/*
======================================
Function Declarations
======================================
*/

// Display list of letters pressed, not allowing for duplicate key presses
function displayLettersPressed(letter, list) {
    // Push letter pressed into the array
    lettersGuessed.push(letter);

    // Cycle through that array to remove duplicates
    // (and if it has to remove a duplicate, don't subract a guess)

    var i; 
    var result = [];
    var obj = {};
    var pushedLetter;
    for (i = 0; i < list.length; i++) {
        obj[list[i]] = 0;
    };
    for (i in obj) {
        result.push(i);
        // pushedLetter = true;
    };
    // if (pushedLetter) {
    //     subtractGuess();
    // }
    console.log(result);
    document.getElementById("letters-guessed").innerText = result.join(" ").toUpperCase();
};

// Choose a random item from the Word Bank array
function getRandomWord(arr) {
    randomWord = arr[Math.floor(Math.random() * arr.length)];
    console.log(randomWord);
};

// Print number of blank spaces equal to random word from word bank | creates a unique span with a unique numbered ID for each space
function printBlankSpaces(str) {
    var blankSpaces = document.getElementById("current-word");
    for (var i = 0; i < str.length; i++) {
        newSpan = document.createElement("span");
        newSpan.setAttribute("id", (i));
        newSpan.innerHTML = " _ ";
        blankSpaces.appendChild(newSpan);
    };
};

// Print Clue
function printClue(word, clues) {
    var index = wordBank.indexOf(word);
    var clue = document.getElementById("clue");
    for (var i = 0; i < clues.length; i++) {
        if (index === i) {
            newSpan = document.createElement("span");
            newSpan.innerHTML = clues[i];
            clue.appendChild(newSpan);
        };
    };
};

// Subtract one guess from guesses remaining
function subtractGuess() {
    if (guessesRemaining.innerHTML > 1) {
        guessesRemaining.innerHTML--;
    } else {
        document.getElementById("loss-button").style.visibility = "visible";
        losses++;
        document.getElementById("losses").innerText = "Losses: " + losses;
    };
};

// Reveal letters if guessed correctly
function revealLetters(word, letter) {
    for (var i = 0; i < word.length; i++) {
        if (letter == word.charAt(i)) {
            for (var i = 0; i < word.length; i++) {
                if (letter == word.charAt(i)) {
                    var toReplace = document.getElementById((i));
                    toReplace.innerHTML = letter;
                    // Update newLetterPressed boolean for subtractGuess
                    wrongGuess = false;
                };
            };
        };
    };
};

// Determine if user has won
function hasWon(word) {
    var currentStatus = "";
    for (var i = 0; i < word.length; i++) {
        currentStatus += document.getElementById(i).innerHTML;
    };
    if (currentStatus === word) {
        document.getElementById("win-button").style.visibility = "visible";
        wins++;
        document.getElementById("wins").innerText = "Wins: " + wins;
    };
};

// Start New Game
function newGame() {
    // Reset Current Word
    document.getElementById("current-word").innerHTML = "";
    blankSpaces = document.getElementById("current-word");
    getRandomWord(wordBank);
    printBlankSpaces(randomWord);
    // Reset and print new clue
    document.getElementById("clue").innerHTML = "";
    printClue(randomWord, clueBank);
    // Reset Letters Guessed
    document.getElementById("letters-guessed").innerHTML = "";
    lettersGuessed = [];
    // Reset Guesses Remaining
    document.getElementById("guesses-remaining").innerHTML = "6";
    // Hide Win Button
    document.getElementById("win-button").style.visibility = "hidden";
    // Hide Loss Button
    document.getElementById("loss-button").style.visibility = "hidden";
};

/*
======================================
Function Calls
======================================
*/

// Initialize first round
newGame();



