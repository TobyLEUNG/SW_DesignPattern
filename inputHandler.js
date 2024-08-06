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
