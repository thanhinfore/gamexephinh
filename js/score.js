export class Score {
    constructor(scoreSelector, highScoreSelector) {
        this.scoreEl = document.querySelector(scoreSelector);
        this.highScoreEl = document.querySelector(highScoreSelector);
        this.score = 0;
        this.highScore = 0;
        this.loadHighScore();
    }

    add(points) {
        this.score += points;
        this.scoreEl.textContent = this.score;
        if (this.score > this.highScore) {
            this.highScore = this.score;
            this.highScoreEl.textContent = `Best: ${this.highScore}`;
            localStorage.setItem('highScore', this.highScore);
        }
    }

    reset() {
        this.score = 0;
        this.scoreEl.textContent = this.score;
    }

    loadHighScore() {
        const saved = parseInt(localStorage.getItem('highScore')) || 0;
        this.highScore = saved;
        this.highScoreEl.textContent = `Best: ${this.highScore}`;
    }
}
