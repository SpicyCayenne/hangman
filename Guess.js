class Guess {
    constructor(_letterValue) {
        this.letterValue = _letterValue+97;
        this.makeAButton(this.letterValue);
    };

    makeAButton(letterValue){
        let ltr = String.fromCharCode(letterValue)
        document.getElementById('letters').insertAdjacentHTML('beforeend', `<input type="button" id="${ltr}" class="guess" value="${ltr}"/>`)
    }
}