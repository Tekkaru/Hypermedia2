const wordCandidates = ["javascript", "hangman", "web", "project", "coding", "bootstrap", "framework", "creative", "prototype", "group"];

let selectedWord = wordCandidates[Math.floor(Math.random() * wordCandidates.length)];
let guessedLetters = [];
let incorrectAttempts = 0;

function initializeGame() {
    selectedWord = wordCandidates[Math.floor(Math.random() * wordCandidates.length)];
    guessedLetters = [];
    incorrectAttempts = 0;
    updateHangmanImage(); // Agregamos esta línea para mostrar la imagen inicial
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
            } else {
                incorrectAttempts++;
                updateHangmanImage();
            }

            inputElement.value = "";

            if (wordIsGuessed()) {
                endGame(true);
            } else if (incorrectAttempts >= 9) {
                endGame(false);
            }
        } else {
            alert("Ya has intentado esta letra. Prueba otra.");
        }
    } else {
        alert("Ingresa una letra válida.");
    }
}

function updateWordDisplay() {
    let display = "";
    for (let char of selectedWord) {
        if (guessedLetters.includes(char) || char === " ") {
            display += char + " ";
        } else {
            display += "_ ";
        }
    }
    document.getElementById("word-display").innerText = display.trim();
}

function wordIsGuessed() {
    return selectedWord.split('').every(char => guessedLetters.includes(char) || char === " ");
}

function updateHangmanImage() {
    const hangmanImage = document.getElementById("hangman-image");
    hangmanImage.src = `Images/hangman_${incorrectAttempts}.png`;
}

function endGame(isWinner) {
    if (isWinner) {
        alert("¡Felicidades! Has adivinado la palabra.");
    } else {
        alert("Lo siento, has perdido. La palabra era: " + selectedWord);
    }

    guessedLetters = [];
    initializeGame();
}

window.onload = initializeGame;
