export class Grid {
    constructor(rows, cols, containerSelector) {
        this.rows = rows;
        this.cols = cols;
        this.cells = Array.from({ length: rows }, () => Array(cols).fill(null));
        this.container = document.querySelector(containerSelector);
        this.render();
    }

    render() {
        this.container.innerHTML = '';
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const cell = document.createElement('div');
                cell.classList.add('grid-cell');
                cell.dataset.row = r;
                cell.dataset.col = c;
                this.container.appendChild(cell);
            }
        }
    }

    canPlaceBlock(block, row, col) {
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

    placeBlock(block, row, col) {
        for (let r = 0; r < block.shape.length; r++) {
            for (let c = 0; c < block.shape[r].length; c++) {
                if (!block.shape[r][c]) continue;
                const newRow = row + r;
                const newCol = col + c;
                this.cells[newRow][newCol] = block.color;
                const cellEl = this.container.querySelector(
                    `.grid-cell[data-row="${newRow}"][data-col="${newCol}"]`
                );
                if (cellEl) {
                    cellEl.style.background = block.color;
                }
            }
        }
    }

    checkLines() {
        const fullRows = [];
        const fullCols = [];

        for (let r = 0; r < this.rows; r++) {
            if (this.cells[r].every(cell => cell)) fullRows.push(r);
        }

        for (let c = 0; c < this.cols; c++) {
            let full = true;
            for (let r = 0; r < this.rows; r++) {
                if (!this.cells[r][c]) {
                    full = false;
                    break;
                }
            }
            if (full) fullCols.push(c);
        }

        return { rows: fullRows, cols: fullCols };
    }

    clearLines(lines) {
        lines.rows.forEach(r => {
            for (let c = 0; c < this.cols; c++) {
                this.cells[r][c] = null;
                const cellEl = this.container.querySelector(
                    `.grid-cell[data-row="${r}"][data-col="${c}"]`
                );
                if (cellEl) cellEl.style.background = '';
            }
        });

        lines.cols.forEach(c => {
            for (let r = 0; r < this.rows; r++) {
                this.cells[r][c] = null;
                const cellEl = this.container.querySelector(
                    `.grid-cell[data-row="${r}"][data-col="${c}"]`
                );
                if (cellEl) cellEl.style.background = '';
            }
        });
    }
}
