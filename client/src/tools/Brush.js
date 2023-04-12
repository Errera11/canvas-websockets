import {Tool} from "./Tool";

export class Brush extends Tool {

    constructor(canvas) {
        super(canvas);
        this.listen();
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    }

    mouseDownHandler(e) {
        this.ctx.beginPath();
        this.mouseDown = true;
    }

    mouseUpHandler(e) {
        this.mouseDown = false;
    }

    mouseMoveHandler(e) {
        if(this.mouseDown) {
            this.draw(e.offsetX, e.offsetY)
        }
    }
    draw(x, y) {
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
    }
}