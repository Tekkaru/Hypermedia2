const wordCandidates = ["javascript", "hangman", "web", "project", "coding", "bootstrap", "framework", "creative", "prototype", "group"];

let selectedWord = "";
let guessedLetters = [];

function initializeGame() {
    selectedWord = wordCandidates[Math.floor(Math.random() * wordCandidates.length)];
    updateWordDisplay();
}

function guessLetter() {
    const inputElement = document.getElementById("letter-input");
    const letter = inputElement.value.toLowerCase();

    if (/^[a-z]$/.test(letter)) {
        if (!guessedLetters.includes(letter)) {
            guessedLetters.push(letter);

            if (selectedWord.includes(letter)) {
                updateWordDisplay();
            }

            inputElement.value = ""; // Clear the input field after guessing

            if (wordIsGuessed()) {
                endGame(true);
            }
        } else {
            alert("You've already tried this letter. Try another one.");
        }
    } else {
        alert("Enter a valid letter.");
    }
}

function updateWordDisplay() {
    const display = selectedWord
        .split('')
        .map(char => (guessedLetters.includes(char) || char === " ") ? char : "_")
        .join(" ");

    document.getElementById("word-display").innerHTML = display;
}

function wordIsGuessed() {
    return selectedWord.split('').every(char => guessedLetters.includes(char) || char === " ");
}

function endGame(isWinner) {
    if (isWinner) {
        alert("Congratulations! You've guessed the word.");
    } else {
        alert("Sorry, you've lost. The word was: " + selectedWord);
    }

    guessedLetters = [];
    initializeGame();
}

window.onload = initializeGame;
