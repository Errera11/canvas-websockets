import {Tool} from "./Tool";

export default class Rect extends Tool {
    constructor(socket, canvas, sessionId) {
        super(socket, canvas, sessionId);
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
        this.socket.send(JSON.stringify({
            id: this.sessionId,
            method: 'draw',
            figure: {
                type: 'Rect',
                x: this.startX,
                y: this.startY,
                width: this.width,
                height: this.height,
                color: this.ctx.strokeStyle,
                thickness: this.ctx.lineWidth
            }
        }))
        this.socket.send(JSON.stringify({
            id: this.sessionId,
            method: 'draw',
            figure: {
                type: 'Finish',
            }
        }))
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            this.drawRect(this.startX,
                this.startY,
                e.offsetX - this.startX,
                e.offsetY - this.startY)
        }
    }

    drawRect(x, y, width, height) {
        this.width = width;
        this.height = height;
        const img = new Image();
        img.src = this.savedImg;
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath();
            this.ctx.rect(x, y, width, height);
            this.ctx.stroke();
        }
    }

    static draw(x, y, width, height, ctx, color, thickness) {
        ctx.beginPath();
        ctx.lineWidth = thickness;
        ctx.strokeStyle = color;
        ctx.rect(x, y, width, height);
        ctx.stroke();
    }

}