export const SHAPES = [
    [[1]],
    [
        [1,1],
        [1,1]
    ],
    [
        [1,1,1],
        [1,1,1],
        [1,1,1]
    ],
    [
        [1,0],
        [1,0],
        [1,1]
    ],
    [
        [1,1,1],
        [0,1,0]
    ],
    [
        [1,1,1]
    ],
    [
        [1,1,1,1]
    ],
    [
        [1,1],
        [1,0]
    ]
];

const COLORS = ['#ff7675','#74b9ff','#55efc4','#ffeaa7','#a29bfe','#fd79a8'];

export class Block {
    constructor(shape, color) {
        this.shape = shape;
        this.color = color;
        this.element = null;
    }

    createDOMElement() {
        const rows = this.shape.length;
        const cols = this.shape[0].length;
        const el = document.createElement('div');
        el.classList.add('block');
        el.style.gridTemplateColumns = `repeat(${cols}, 40px)`;
        for (let r=0;r<rows;r++) {
            for (let c=0;c<cols;c++) {
                if (!this.shape[r][c]) {
                    const spacer = document.createElement('div');
                    spacer.style.width = '40px';
                    spacer.style.height = '40px';
                    el.appendChild(spacer);
                    continue;
                }
                const cell = document.createElement('div');
                cell.classList.add('block-cell');
                cell.style.background = this.color;
                el.appendChild(cell);
            }
        }
        this.element = el;
        this.enableDragging();
        return el;
    }

    enableDragging() {
        if (!this.element) return;
        this.element.draggable = true;
    }
}

export function createRandomBlock() {
    const shape = SHAPES[Math.floor(Math.random()*SHAPES.length)];
    const color = COLORS[Math.floor(Math.random()*COLORS.length)];
    return new Block(shape, color);
}
