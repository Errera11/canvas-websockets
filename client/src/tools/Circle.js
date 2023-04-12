import {Tool} from "./Tool";

export default class Circle extends Tool {
    constructor(canvas) {
        super(canvas);
        this.listen()
    }

    listen() {
        this.canvas.onmousedown = this.onMouseDownHandler.bind(this);
        this.canvas.onmousemove = this.onMouseMoveHandler.bind(this);
        this.canvas.onmouseup = this.onMouseUpHandler.bind(this);
    }

    onMouseDownHandler(e) {
        this.mouseDown = true;
        this.ctx.beginPath();
        this.savegImage = this.canvas.toDataURL();
        this.startX = e.offsetX;
        this.startY = e.offsetY;

    }

    onMouseUpHandler(e) {
        this.mouseDown = false;
    }

    onMouseMoveHandler(e) {
        if(this.mouseDown) {
            this.draw(Math.abs(e.offsetX - this.startX));
        }
    }

    draw(radius) {
        this.ctx.arc(this.startX, this.startY, radius, 0, 2 * Math.PI)
        this.ctx.stroke()
        const img = new Image();
        img.src = this.savegImage;
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.arc(this.startX, this.startY, radius, 0, 2 * Math.PI)
            this.ctx.stroke()
        }
    }
}