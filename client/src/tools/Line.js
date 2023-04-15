import {Tool} from "./Tool";

export class Line extends Tool {
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
        this.startX = e.offsetX;
        this.startY = e.offsetY;
        this.savedImage = this.canvas.toDataURL();

    }

    onMouseUpHandler(e) {
        this.mouseDown = false;
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.sessionId,
            figure: {
                type: 'Line',
                startX: this.startX,
                startY: this.startY,
                x: this.x,
                y: this.y,
                thickness: this.ctx.lineWidth,
                color: this.ctx.lineStyle
            }
        }))

        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.sessionId,
            figure: {
                type: 'Finish',
            }
        }))
    }

    onMouseMoveHandler(e) {
        if (this.mouseDown) {
            this.drawLine(e.offsetX, e.offsetY);
        }
    }

    drawLine(x, y) {
        const img = new Image();
        this.x = x;
        this.y = y;
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

    static draw(startX, startY, x, y, ctx, thickness, color) {
        ctx.beginPath();
        ctx.lineWidth = thickness;
        ctx.lineStyle = color;
        ctx.moveTo(startX, startY);
        ctx.lineTo(x, y);
        ctx.stroke();
    }

}