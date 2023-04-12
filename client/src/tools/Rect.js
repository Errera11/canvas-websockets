import {Tool} from "./Tool";

export default class Rect extends Tool{
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
        this.savedImg = this.canvas.toDataURL();
        this.mouseDown = true;
        this.ctx.beginPath();
        this.startX = e.offsetX;
        this.startY = e.offsetY;
    }

    mouseUpHandler(e) {
        this.mouseDown = false;
    }

    mouseMoveHandler(e) {
        if(this.mouseDown) {
            this.draw(this.startX,
                this.startY,
                e.offsetX - this.startX,
                 e.offsetY - this.startY)

        }
    }
    draw(x, y, width, height) {
        const img = new Image();
        img.src = this.savedImg;
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img,0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath();
            this.ctx.rect(x, y, width, height);
            this.ctx.stroke();
        }

    }
}