import {Tool} from "./Tool";

export default class Circle extends Tool {
    constructor(socket, canvas, sessionId) {
        super(socket, canvas, sessionId);
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
        this.savedImage = this.canvas.toDataURL();
        this.startX = e.offsetX;
        this.startY = e.offsetY;

    }

    onMouseUpHandler(e) {
        this.mouseDown = false;
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.sessionId,
            figure: {
                type: 'Circle',
                startX: this.startX,
                startY: this.startY,
                radius: this.radius,
                thickness: this.ctx.lineWidth,
                color: this.ctx.strokeStyle
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
        if(this.mouseDown) {
            this.radius = Math.abs(e.offsetX - this.startX);
            this.drawCircle(this.radius);
        }
    }

    drawCircle(radius) {
        this.ctx.arc(this.startX, this.startY, radius, 0, 2 * Math.PI)
        this.ctx.stroke()
        const img = new Image();
        img.src = this.savedImage;
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.arc(this.startX, this.startY, radius, 0, 2 * Math.PI)
            this.ctx.stroke()
        }
    }

    static draw(startX, startY, radius, ctx, thickness, color) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = thickness;
        ctx.arc(startX,startY, radius, 0, 2 * Math.PI)
        ctx.stroke()
    }
}