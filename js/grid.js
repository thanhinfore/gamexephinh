export class Grid {
    constructor(rows, cols, containerSelector) {
        this.rows = rows;
        this.cols = cols;

        this.container.innerHTML = '';
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const cell = document.createElement('div');
                cell.classList.add('grid-cell');

                this.container.appendChild(cell);
            }
        }
    }


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


    }
}
