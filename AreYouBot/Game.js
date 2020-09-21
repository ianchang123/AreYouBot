class Game {
    constructor() {
        this.currentLevel = 0;
        this.levels = [];
        this.currentAnswer = [];
        this.timeLeft = 29;
        // parameter for createRandomLevels is number of levels to have
        this.createRandomLevels(5);
        for (var i = 0; i < this.levels.length; i++) {
            this.levels[i] = this.levels[i].sort(function(a, b){return a - b});
        }
    }
    // helper
    getPasswordForLevel(levelNumber) {
        return this.levels[levelNumber].toString();
    }
    // helper
    checkIfAnswerCorrect(userAnswer) {
        return userAnswer.sort(function(a, b){return a - b}).toString() == this.getPasswordForLevel(this.currentLevel);
    }

    // getter for testing
    getCurrentAnswer() {
        return this.currentAnswer;
    }

    createRandomLevels(numberOfLevels) {
        for (var i = 0; i < numberOfLevels; i++) {
            var tempLevel = [];
            var sizeOfLevel = Math.floor((Math.random() * 10) + 1);
            for (var j = 0; j < sizeOfLevel; j++) {
                var randomNumber = Math.floor((Math.random() * 15) + 1);
                while (tempLevel.includes(randomNumber)) {
                    randomNumber = Math.floor((Math.random() * 15) + 1);
                }
                tempLevel.push(randomNumber);
            }
            this.levels.push(tempLevel);
        }
    }

    updateImages() {
        for (var i = 0; i < 16; i++) {
            if (this.levels[this.currentLevel].includes(i)) {
                document.getElementById("image" + i).src="images/smiley-face.png";
            }
            else {
                document.getElementById("image" + i).src="images/neutral-face.png";
            }
            document.getElementById("image" + i).style.backgroundColor = "transparent";
        }
    }

    updateCurrentAnswer(selectedInt) {
        var num = this.currentAnswer.indexOf(selectedInt);
        if (num == -1) {
            this.currentAnswer.push(selectedInt);
            document.getElementById("image" + selectedInt).style.backgroundColor = "red";
        }
        else {
            this.currentAnswer.splice(num, 1);
            document.getElementById("image" + selectedInt).style.backgroundColor = "transparent";
        }
    }

    submitAnswer() {
        if (this.checkIfAnswerCorrect(this.currentAnswer)) {
            if (this.currentLevel == this.levels.length - 1) {
                document.location.href = "startagainpagewin.html";
                return;
            }
            this.currentAnswer = [];
            this.currentLevel++;
            this.updateImages();
            return;
        }
        else {
            document.location.href = "yes.html";
            return;
        }
    }

    updateEverySecond() {
        document.getElementById("countdownTimer").innerHTML = "" + this.timeLeft + " seconds";
        if (this.timeLeft <= 0) {
            document.location.href = "yes.html";
        }
        else {
            this.timeLeft -= 1;
        }
    }
}
