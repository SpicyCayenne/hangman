import words from "./node_modules/random-words/index.js";
import Guess from './Guess.js'

class Game {

    constructor() {
        this.word;
        this.revealWord = '';

    }

    play() {
        this.word = this.getRandomWord();
        console.log(this.word)
        this.revealWord = this.word;
        this.guessesLeft = 6;
        this.setupGame();
    }

    getRandomWord() {
        return words()
    }

    guessWord() {
        let finalGuess = document.getElementById('guess').value;
        finalGuess = finalGuess.toLowerCase();
        if (finalGuess === this.word) {
            this.endGame('w')
        } else {
            this.endGame('l')
        }
    }

    guessLetter(letter) {
        let btn = document.getElementById(`${letter}`)
        if (this.word.indexOf(letter) === -1) {
            btn.style.background = "red"
            this.guessesLeft--;
        }
        this.updateHiddenWord(letter);
        btn.setAttribute('disabled', true);
    }

    updateHiddenWord(checkLetter) {
        document.getElementById('guessCount').innerText = `Wrong guesses remaining: ${this.guessesLeft}`;
        let knownLetters = [...this.revealWord]
        this.revealWord = ''
        for (let letter in this.word) {
            if (checkLetter === undefined) {
                // if it's the beginning of the game we're not checking letters yet and this.revealWord should all be blank
                this.revealWord += '_';
                continue;
            }
            if (checkLetter === this.word[letter]) {
                this.revealWord += checkLetter;
            } else {
                this.revealWord += knownLetters[letter]
            }
        }
        document.getElementById('secretWord').innerText = this.revealWord;
        if (this.revealWord === this.word) {
            return this.endGame('w')
        }
        if (this.guessesLeft <= 0) {
            return this.endGame('l')
        }
    }

    endGame(outcome) {
        let result = document.getElementById('outcome')
        result.style.display = 'flex'
        if (outcome === 'w') {
            result.style.backgroundColor = "green";
            result.innerText = 'YOU WIN!'
        } else {
            result.style.backgroundColor = "red";
            result.innerText = `You lose :( the word was ${this.word.toUpperCase()}`
        }
        result.insertAdjacentHTML('beforeend', `<input type="button" id="playAgain" value="Play Again" />`)
        document.getElementById('playAgain').addEventListener('click', () => {
            this.newGame()
        })
    }

    newGame() {
        document.getElementById('playerArea').innerHTML = `<input type="text" id="guess" placeholder="guess the word"/>
        <input type="button" id="submitGuess" value="Final answer!" />
        <div id="guessCount"></div><div id="letters"></div>`;
        document.getElementById('outcome').style.display = "none";
        this.play()
    }

    setupGame() {
        this.updateHiddenWord()
        for (let i = 0; i < 26; i++) {
            new Guess(i);
            document.getElementById(`${String.fromCharCode(i+97)}`).addEventListener('click', () => {
                this.guessLetter(`${String.fromCharCode(i+97)}`);
            })
        }
        document.getElementById('submitGuess').addEventListener('click', () => {
            this.guessWord()
        })
    }
}

export {
    Game
}