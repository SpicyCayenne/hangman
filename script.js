import {
    words
} from './node_modules/random-words/index.js'
import {
    Game
} from './Game.js'

console.log(words.wordList)
let game = new Game()
game.play()