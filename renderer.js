
// renderer.js
export class Renderer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.gridSize = 20;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawSnake(snake) {
        this.ctx.fillStyle = 'green';
        snake.forEach(segment => {
            this.ctx.fillRect(segment.x * this.gridSize, segment.y * this.gridSize, this.gridSize - 1, this.gridSize - 1);
        });
    }

    drawFruit(fruit) {
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(fruit.x * this.gridSize, fruit.y * this.gridSize, this.gridSize - 1, this.gridSize - 1);
    }

    drawGrid(grid) {
        grid.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    this.ctx.fillStyle = 'blue';
                    this.ctx.fillRect(x * this.gridSize, y * this.gridSize, this.gridSize - 1, this.gridSize - 1);
                }
            });
        });
    }

    drawTetromino(piece) {
        this.ctx.fillStyle = 'purple';
        piece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    this.ctx.fillRect((piece.x + x) * this.gridSize, (piece.y + y) * this.gridSize, this.gridSize - 1, this.gridSize - 1);
                }
            });
        });
    }

    drawScore(score) {
        this.ctx.fillStyle = 'black';
        this.ctx.font = '20px Arial';
        this.ctx.fillText(`Score: ${score}`, 10, 30);
    }

    drawGameOver(score) {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'white';
        this.ctx.font = '30px Arial';
        this.ctx.fillText('Game Over', this.canvas.width / 2 - 70, this.canvas.height / 2 - 30);
        this.ctx.fillText(`Final Score: ${score}`, this.canvas.width / 2 - 85, this.canvas.height / 2 + 20);
    }
}

// inputHandler.js
export class InputHandler {
    constructor() {
        this.keyDownHandlers = [];
        this.keyUpHandlers = [];
        window.addEventListener('keydown', this.handleKeyDown.bind(this));
        window.addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    onKeyDown(handler) {
        this.keyDownHandlers.push(handler);
    }

    onKeyUp(handler) {
        this.keyUpHandlers.push(handler);
    }

    handleKeyDown(event) {
        this.keyDownHandlers.forEach(handler => handler(event.key));
    }

    handleKeyUp(event) {
        this.keyUpHandlers.forEach(handler => handler(event.key));
    }
}
