// main.js
import { Game } from './game.js';
import { SnakeMode } from './snakeMode.js';
import { TetrisMode } from './tetrisMode.js';
import { Renderer } from './renderer.js';
import { InputHandler } from './inputHandler.js';

// 初始化遊戲實例
const game = new Game({
    width: 300,
    height: 600,
    gridSize: 20,
    modes: [new SnakeMode(), new TetrisMode()],
    renderer: new Renderer('gameCanvas'),
    inputHandler: new InputHandler()
});

// 開始遊戲
game.start();
