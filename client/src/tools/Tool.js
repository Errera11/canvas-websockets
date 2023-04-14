
export class Tool {
    constructor(socket, canvas, sessionId) {
        this.socket = socket;
        this.sessionId = sessionId;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.destroyTool();
    }

    destroyTool() {
        this.ctx.mouseUp = null;
        this.ctx.mouseDown = null;
        this.ctx.mouseMove = null;
    }

    changeColor(color) {
        this.ctx.strokeStyle = color;
    }

    changeThickness(val) {
        this.ctx.lineWidth = val;
    }
}