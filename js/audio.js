export class Sound {
    constructor() {
        this.enabled = true;
        this.ctx = null;
    }

    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }

    play(freq = 440, duration = 0.1) {
        if (!this.enabled) return;
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.frequency.value = freq;
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    }

    drop() {
        this.play(300, 0.05);
    }

    clear() {
        this.play(600, 0.1);
    }
}
