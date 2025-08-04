export function saveState(state) {
    localStorage.setItem('gameState', JSON.stringify(state));
}

export function loadState() {
    const raw = localStorage.getItem('gameState');
    return raw ? JSON.parse(raw) : null;
}

export function clearState() {
    localStorage.removeItem('gameState');
}
