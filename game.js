// game.js
export class Game {
    constructor(config) {
        this.config = config;
        this.currentMode = null;
        this.score = 0;
        this.isGameOver = false;

        // 設置輸入處理
        this.config.inputHandler.onKeyDown(this.handleInput.bind(this));
    }

    start() {
        this.switchMode(this.config.modes[0]);
        this.gameLoop();
    }

    gameLoop() {
        if (!this.isGameOver) {
            this.update();
            this.render();
            requestAnimationFrame(() => this.gameLoop());
        }
    }

    update() {
        this.currentMode.update(this);
    }

    render() {
        this.config.renderer.clear();
        this.currentMode.render(this.config.renderer);
        this.config.renderer.drawScore(this.score);
    }

    switchMode(newMode) {
        this.currentMode = newMode;
        this.currentMode.enter(this);
    }

    handleInput(key) {
        this.currentMode.handleInput(key, this);
    }

    gameOver() {
        this.isGameOver = true;
        this.config.renderer.drawGameOver(this.score);
    }
}
