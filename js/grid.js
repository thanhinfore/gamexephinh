export class Grid {
    constructor(rows, cols, containerSelector) {
        this.rows = rows;
        this.cols = cols;
        this.container = document.querySelector(containerSelector);
        this.cells = Array.from({ length: rows }, () => Array(cols).fill(null));
        this.render();
    }

    render(active = null) {
        this.container.innerHTML = '';
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const cell = document.createElement('div');
                cell.classList.add('grid-cell');
                let color = this.cells[r][c];
                if (active) {
                    const { block, row, col } = active;
                    if (
                        r >= row &&
                        r < row + block.shape.length &&
                        c >= col &&
                        c < col + block.shape[0].length &&
                        block.shape[r - row][c - col]
                    ) {
                        color = block.color;
                    }
                }
                if (color) cell.style.background = color;
                this.container.appendChild(cell);
            }
        }
    }

    isValid(block, row, col) {
        for (let r = 0; r < block.shape.length; r++) {
            for (let c = 0; c < block.shape[r].length; c++) {
                if (!block.shape[r][c]) continue;
                const newRow = row + r;
                const newCol = col + c;
                if (
                    newRow < 0 || newRow >= this.rows ||
                    newCol < 0 || newCol >= this.cols ||
                    this.cells[newRow][newCol]
                ) {
                    return false;
                }
            }
        }
        return true;
    }

    place(block, row, col) {
        for (let r = 0; r < block.shape.length; r++) {
            for (let c = 0; c < block.shape[r].length; c++) {
                if (!block.shape[r][c]) continue;
                this.cells[row + r][col + c] = block.color;
            }
        }
    }

    clearLines() {
        let cleared = 0;
        for (let r = this.rows - 1; r >= 0; r--) {
            if (this.cells[r].every(cell => cell)) {
                this.cells.splice(r, 1);
                this.cells.unshift(Array(this.cols).fill(null));
                cleared++;
                r++;
            }
        }
        return cleared;
    }
}
