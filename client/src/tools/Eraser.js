import {Tool} from "./Tool";

export default class Eraser extends Tool {
    constructor(socket, canvas, sessionId) {
        super(socket, canvas, sessionId);
        this.listen();
    }

    listen() {
        this.canvas.onmousedown = this.onMouseDownHandler.bind(this);
        this.canvas.onmousemove = this.onMouseMoveHandler.bind(this);
        this.canvas.onmouseup = this.onMouseUpHandler.bind(this);
    }

    onMouseDownHandler(e) {
        this.mouseDown = true;
        this.ctx.beginPath();
    }

    onMouseUpHandler(e) {
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.sessionId,
            figure: {
                type: 'Finish',
                x: e.offsetX,
                y: e.offsetY,
                thickness: this.ctx.lineWidth
            }}))
        this.mouseDown = false;
        this.ctx.strokeStyle = 'black';
    }

    onMouseMoveHandler(e) {
        if(this.mouseDown) {
            this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.sessionId,
                figure: {
                    type: 'Eraser',
                    x: e.offsetX,
                    y: e.offsetY,
                    thickness: this.ctx.lineWidth
                }
            }))
        }
    }

    static draw(x, y, ctx, thickness) {
        ctx.strokeStyle = "white";
        ctx.lineWidth = thickness;
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}