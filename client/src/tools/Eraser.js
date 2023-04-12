import {Tool} from "./Tool";

export default class Eraser extends Tool {
    constructor(canvas) {
        super(canvas);
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
        this.ctx.strokeStyle = "black";
        this.mouseDown = false;
    }

    onMouseMoveHandler(e) {
        if(this.mouseDown) {
            this.draw(e.offsetX, e.offsetY);
        }
    }

    draw(x, y) {
        this.ctx.lineTo(x, y)
        this.ctx.strokeStyle = "white";
        this.ctx.stroke()
    }
}