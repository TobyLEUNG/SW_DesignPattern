// snakeMode.js
export class SnakeMode {
    constructor() {
        this.snake = [];
        this.direction = { x: 1, y: 0 };
        this.fruit = { x: 0, y: 0 };
    }

    enter(game) {
        // 初始化蛇的位置
        this.snake = [
            { x: 5, y: 5 },
            { x: 4, y: 5 },
            { x: 3, y: 5 }
        ];
        this.direction = { x: 1, y: 0 };
        this.generateFruit(game);
    }

    update(game) {
        // 移動蛇
        const head = { x: this.snake[0].x + this.direction.x, y: this.snake[0].y + this.direction.y };
        this.snake.unshift(head);

        // 檢查是否吃到水果
        if (head.x === this.fruit.x && head.y === this.fruit.y) {
            game.score += 10;
            this.generateFruit(game);
            game.switchMode(game.config.modes[1]); // 切換到俄羅斯方塊模式
        } else {
            this.snake.pop();
        }

        // 檢查碰撞
        if (this.checkCollision(game)) {
            game.gameOver();
        }
    }

    render(renderer) {
        renderer.drawSnake(this.snake);
        renderer.drawFruit(this.fruit);
    }

    handleInput(key, game) {
        switch (key) {
            case 'ArrowUp': if (this.direction.y === 0) this.direction = { x: 0, y: -1 }; break;
            case 'ArrowDown': if (this.direction.y === 0) this.direction = { x: 0, y: 1 }; break;
            case 'ArrowLeft': if (this.direction.x === 0) this.direction = { x: -1, y: 0 }; break;
            case 'ArrowRight': if (this.direction.x === 0) this.direction = { x: 1, y: 0 }; break;
        }
    }

    generateFruit(game) {
        do {
            this.fruit = {
                x: Math.floor(Math.random() * (game.config.width / game.config.gridSize)),
                y: Math.floor(Math.random() * (game.config.height / game.config.gridSize))
            };
        } while (this.snake.some(segment => segment.x === this.fruit.x && segment.y === this.fruit.y));
    }

    checkCollision(game) {
        const head = this.snake[0];
        return (
            head.x < 0 || head.x >= game.config.width / game.config.gridSize ||
            head.y < 0 || head.y >= game.config.height / game.config.gridSize ||
            this.snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
        );
    }
}
