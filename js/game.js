import { Grid } from './grid.js';
import { randomBlock } from './blocks.js';
import { Score } from './score.js';

class Game {
    constructor() {
        this.grid = new Grid(20, 10, '.grid-container');
        this.score = new Score('.score', '.high-score');
        this.current = null;
        this.next = randomBlock();
        this.currentRow = 0;
        this.currentCol = 0;
        this.interval = 800;
        this.timer = null;
        this.nextEl = document.querySelector('.next-block');
    }

    init() {
        this.spawn();
        document.addEventListener('keydown', e => this.handleKey(e));
        document.querySelector('.btn-restart').addEventListener('click', () => this.restart());
        this.start();
    }

    start() {
        this.stop();
        this.timer = setInterval(() => this.tick(), this.interval);
    }

    stop() {
        if (this.timer) clearInterval(this.timer);
    }

    spawn() {
        this.current = this.next;
        this.currentRow = 0;
        this.currentCol = Math.floor(this.grid.cols / 2) - Math.ceil(this.current.shape[0].length / 2);
        this.next = randomBlock();
        this.renderNext();
        if (!this.grid.isValid(this.current, this.currentRow, this.currentCol)) {
            alert('Game Over!');
            this.restart();
        }
        this.grid.render({ block: this.current, row: this.currentRow, col: this.currentCol });
    }

    renderNext() {
        this.nextEl.innerHTML = '';
        const rows = this.next.shape.length;
        const cols = this.next.shape[0].length;
        const el = document.createElement('div');
        el.classList.add('block');
        el.style.gridTemplateColumns = `repeat(${cols}, 30px)`;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (!this.next.shape[r][c]) {
                    const spacer = document.createElement('div');
                    spacer.style.width = '30px';
                    spacer.style.height = '30px';
                    el.appendChild(spacer);
                } else {
                    const cell = document.createElement('div');
                    cell.classList.add('block-cell');
                    cell.style.background = this.next.color;
                    el.appendChild(cell);
                }
            }
        }
        this.nextEl.appendChild(el);
    }

    tick() {
        if (this.grid.isValid(this.current, this.currentRow + 1, this.currentCol)) {
            this.currentRow++;
        } else {
            this.grid.place(this.current, this.currentRow, this.currentCol);
            const cleared = this.grid.clearLines();
            if (cleared) this.score.add(cleared * 100);
            this.spawn();
        }
        this.grid.render({ block: this.current, row: this.currentRow, col: this.currentCol });
    }

    handleKey(e) {
        switch (e.key) {
            case 'ArrowLeft':
                if (this.grid.isValid(this.current, this.currentRow, this.currentCol - 1)) {
                    this.currentCol--;
                }
                break;
            case 'ArrowRight':
                if (this.grid.isValid(this.current, this.currentRow, this.currentCol + 1)) {
                    this.currentCol++;
                }
                break;
            case 'ArrowDown':
                if (this.grid.isValid(this.current, this.currentRow + 1, this.currentCol)) {
                    this.currentRow++;
                }
                break;
            case 'ArrowUp':
                const original = this.current.shape.map(row => [...row]);
                this.current.rotate();
                if (!this.grid.isValid(this.current, this.currentRow, this.currentCol)) {
                    this.current.shape = original;
                }
                break;
            case ' ': // hard drop
                while (this.grid.isValid(this.current, this.currentRow + 1, this.currentCol)) {
                    this.currentRow++;
                }
                this.tick();
                break;
        }
        this.grid.render({ block: this.current, row: this.currentRow, col: this.currentCol });
    }

    restart() {
        this.stop();
        this.grid = new Grid(20, 10, '.grid-container');
        this.score.reset();
        this.next = randomBlock();
        this.spawn();
        this.start();
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    game.init();
});
