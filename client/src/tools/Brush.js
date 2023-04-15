import {Tool} from "./Tool";

export class Brush extends Tool {

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
        this.ctx.beginPath();
        this.mouseDown = true;
    }

    mouseUpHandler(e) {
        this.mouseDown = false;
        this.socket.send(JSON.stringify({id: this.sessionId, method: 'draw', figure: {type:'Finish'}}));
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            this.socket.send(JSON.stringify({
                id: this.sessionId,
                method: 'draw',
                figure: {
                    type: 'Brush',
                    x: e.offsetX,
                    y: e.offsetY,
                    color: this.ctx.strokeStyle,
                    thickness: this.ctx.lineWidth
                }
        }))
        }
    }


    static draw(x, y, ctx, color, thickness) {
        ctx.lineWidth = thickness;
        ctx.strokeStyle = color;
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}