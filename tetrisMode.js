// tetrisMode.js
export class TetrisMode {
    constructor() {
        this.grid = [];
        this.currentPiece = null;
        this.nextPiece = null;
    }

    enter(game) {
        // 初始化網格
        this.grid = Array(game.config.height / game.config.gridSize)
            .fill()
            .map(() => Array(game.config.width / game.config.gridSize).fill(0));
        this.generateNewPiece();
    }

    update(game) {
        if (this.canMove(0, 1)) {
            this.currentPiece.y++;
        } else {
            this.placePiece();
            this.clearLines(game);
            this.generateNewPiece();
            if (!this.canMove(0, 0)) {
                game.switchMode(game.config.modes[0]); // 切換回貪食蛇模式
            }
        }
    }

    render(renderer) {
        renderer.drawGrid(this.grid);
        renderer.drawTetromino(this.currentPiece);
    }

    handleInput(key, game) {
        switch (key) {
            case 'ArrowLeft': if (this.canMove(-1, 0)) this.currentPiece.x--; break;
            case 'ArrowRight': if (this.canMove(1, 0)) this.currentPiece.x++; break;
            case 'ArrowDown': if (this.canMove(0, 1)) this.currentPiece.y++; break;
            case 'ArrowUp': this.rotatePiece(); break;
        }
    }

    generateNewPiece() {
        const pieces = [
            [[1, 1, 1, 1]],
            [[1, 1], [1, 1]],
            [[1, 1, 1], [0, 1, 0]],
            [[1, 1, 1], [1, 0, 0]],
            [[1, 1, 1], [0, 0, 1]],
            [[1, 1, 0], [0, 1, 1]],
            [[0, 1, 1], [1, 1, 0]]
        ];
        this.currentPiece = {
            shape: pieces[Math.floor(Math.random() * pieces.length)],
            x: Math.floor(this.grid[0].length / 2) - 1,
            y: 0
        };
    }

    canMove(dx, dy) {
        return this.currentPiece.shape.every((row, y) =>
            row.every((value, x) =>
                value === 0 ||
                (this.currentPiece.x + x + dx >= 0 &&
                 this.currentPiece.x + x + dx < this.grid[0].length &&
                 this.currentPiece.y + y + dy < this.grid.length &&
                 (this.grid[this.currentPiece.y + y + dy] === undefined ||
                  this.grid[this.currentPiece.y + y + dy][this.currentPiece.x + x + dx] === 0))
            )
        );
    }

    placePiece() {
        this.currentPiece.shape.forEach((row, y) =>
            row.forEach((value, x) => {
                if (value !== 0) {
                    this.grid[this.currentPiece.y + y][this.currentPiece.x + x] = value;
                }
            })
        );
    }

    clearLines(game) {
        let linesCleared = 0;
        for (let y = this.grid.length - 1; y >= 0; y--) {
            if (this.grid[y].every(cell => cell !== 0)) {
                this.grid.splice(y, 1);
                this.grid.unshift(Array(this.grid[0].length).fill(0));
                linesCleared++;
                y++; // 檢查同一行，因為上面的行已經下移
            }
        }
        if (linesCleared > 0) {
            game.score += linesCleared * 100; // 每清除一行得100分
        }
    }

    rotatePiece() {
        const rotated = this.currentPiece.shape[0].map((_, i) =>
            this.currentPiece.shape.map(row => row[i]).reverse()
        );
        if (this.canRotate(rotated)) {
            this.currentPiece.shape = rotated;
        }
    }

    canRotate(rotatedShape) {
        return rotatedShape.every((row, y) =>
            row.every((value, x) =>
                value === 0 ||
                (this.currentPiece.x + x >= 0 &&
                 this.currentPiece.x + x < this.grid[0].length &&
                 this.currentPiece.y + y < this.grid.length &&
                 (this.grid[this.currentPiece.y + y] === undefined ||
                  this.grid[this.currentPiece.y + y][this.currentPiece.x + x] === 0))
            )
        );
    }
}
