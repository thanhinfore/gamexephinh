import { Grid } from './grid.js';
import { createRandomBlock } from './blocks.js';
import { Score } from './score.js';
import { saveState, loadState } from './storage.js';

class Game {
    constructor() {
        this.grid = new Grid(10, 10, '.grid-container');
        this.score = new Score('.score', '.high-score');
        this.blockQueue = [];
        this.queueEl = document.querySelector('.blocks-queue');
    }

    init() {
        this.loadGame();
        this.generateBlocks();
        this.addGridListeners();
        document.querySelector('.btn-restart').addEventListener('click', () => this.restart());
    }

    generateBlocks() {
        while (this.blockQueue.length < 3) {
            const block = createRandomBlock();
            const el = block.createDOMElement();
            const index = this.blockQueue.length;
            el.addEventListener('dragstart', e => {
                e.dataTransfer.setData('text/plain', index);
            });
            this.queueEl.appendChild(el);
            this.blockQueue.push(block);
        }
    }

    addGridListeners() {
        this.grid.container.addEventListener('dragover', e => e.preventDefault());
        this.grid.container.addEventListener('drop', e => {
            e.preventDefault();
            const blockIndex = e.dataTransfer.getData('text/plain');
            const block = this.blockQueue[blockIndex];
            const target = e.target.closest('.grid-cell');
            if (!target || !block) return;
            const row = parseInt(target.dataset.row);
            const col = parseInt(target.dataset.col);
            if (this.grid.canPlaceBlock(block, row, col)) {
                this.grid.placeBlock(block, row, col);
                const cellsCount = block.shape.flat().filter(Boolean).length;
                this.score.add(10 * cellsCount);
                const lines = this.grid.checkLines();
                const cleared = lines.rows.length + lines.cols.length;
                if (cleared) {
                    this.grid.clearLines(lines);
                    let points = 0;
                    for (let i = 0; i < cleared; i++) {
                        points += 100 * Math.pow(1.5, i);
                    }
                    this.score.add(points);
                }
                block.element.remove();
                this.blockQueue.splice(blockIndex, 1);
                this.generateBlocks();
                this.saveGame();
                this.checkGameOver();
            }
        });
    }

    checkGameOver() {
        const hasMove = this.blockQueue.some(block => {
            for (let r = 0; r < this.grid.rows; r++) {
                for (let c = 0; c < this.grid.cols; c++) {
                    if (this.grid.canPlaceBlock(block, r, c)) return true;
                }
            }
            return false;
        });
        if (!hasMove) {
            alert('Game Over!');
        }
    }

    saveGame() {
        saveState({
            grid: this.grid.cells,
            score: this.score.score,
            highScore: this.score.highScore
        });
    }

    loadGame() {
        const state = loadState();
        if (state) {
            this.grid.cells = state.grid;
            for (let r = 0; r < this.grid.rows; r++) {
                for (let c = 0; c < this.grid.cols; c++) {
                    const color = this.grid.cells[r][c];
                    if (color) {
                        const cellEl = this.grid.container.querySelector(
                            `.grid-cell[data-row="${r}"][data-col="${c}"]`
                        );
                        if (cellEl) cellEl.style.background = color;
                    }
                }
            }
            this.score.score = state.score;
            this.score.scoreEl.textContent = this.score.score;
            this.score.highScore = state.highScore;
            this.score.highScoreEl.textContent = `Best: ${this.score.highScore}`;
        }
    }

    restart() {
        this.grid = new Grid(10, 10, '.grid-container');
        this.score.reset();
        this.blockQueue = [];
        this.queueEl.innerHTML = '';
        localStorage.removeItem('gameState');
        this.generateBlocks();
    }
}


window.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    game.init();
});
