export const TETROMINOES = {
    I: [
        [1, 1, 1, 1]
    ],
    J: [
        [1, 0, 0],
        [1, 1, 1]
    ],
    L: [
        [0, 0, 1],
        [1, 1, 1]
    ],
    O: [
        [1, 1],
        [1, 1]
    ],
    S: [
        [0, 1, 1],
        [1, 1, 0]
    ],
    T: [
        [0, 1, 0],
        [1, 1, 1]
    ],
    Z: [
        [1, 1, 0],
        [0, 1, 1]
    ]
};

const COLORS = ['#ff7675','#74b9ff','#55efc4','#ffeaa7','#a29bfe','#fd79a8','#fab1a0'];

export class Block {
    constructor(shape, color) {
        this.shape = shape;
        this.color = color;
    }

    rotate() {
        this.shape = this.shape[0].map((_, i) => this.shape.map(row => row[i]).reverse());
    }
}

export function randomBlock() {
    const keys = Object.keys(TETROMINOES);
    const key = keys[Math.floor(Math.random() * keys.length)];
    const shape = TETROMINOES[key].map(row => [...row]);
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    return new Block(shape, color);
}
