import {Tool} from "./Tool";

export class Line extends Tool {
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
        this.startX = e.offsetX;
        this.startY = e.offsetY;
        this.savedImage = this.canvas.toDataURL();

    }

    onMouseUpHandler(e) {
        this.mouseDown = false;
    }

    onMouseMoveHandler(e) {
        if(this.mouseDown) {
            this.draw(e.offsetX, e.offsetY);
        }
    }

    draw(x, y) {
        const img = new Image();
        img.src = this.savedImage;
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath();
            this.ctx.moveTo(this.startX, this.startY);
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
        }
    }
}