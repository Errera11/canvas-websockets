
import {makeAutoObservable} from "mobx";


class ToolState {
    constructor() {
        makeAutoObservable(this);
    }

    setTool(tool) {
        this.tool = tool;
    }

    setColor(color) {
        this.tool.changeColor(color)
    }

    setThickness(val) {
        this.tool.changeThickness(val)
    }
}

export default new ToolState();