import {makeAutoObservable} from "mobx";


class CanvasState {
    username = '';
    undoArr = [];
    redoArr = [];
    constructor() {
        makeAutoObservable(this);
    }

    setCanvas(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d')
    }

    setUsername(name) {
        this.username = name;
    }

    snapshot() {
        const canvasSnapshot = this.canvas.toDataURL();
        const img = this.urlToImage(canvasSnapshot);
        this.undoArr.push(img);
    }

     urlToImage(url) {
        const img = new Image();
        img.src = url;
        img.onload = () => img;
        return img;
    }

    undo() {
        if(!this.undoArr.length) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            return;
        }
        const image = this.undoArr.pop();
        this.redoArr.push(this.urlToImage(this.canvas.toDataURL()));
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
    }

    redo() {
        if(!this.redoArr.length) {
            return;
        }
        const image = this.redoArr.pop();
        this.undoArr.push(this.urlToImage(this.canvas.toDataURL()));
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
    }

}

export default new CanvasState();