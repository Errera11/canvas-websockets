import React from 'react';
import '../styles/Toolbar.scss';
import toolState from "../store/toolState";
import canvasState from "../store/canvasState";
import {Brush} from "../tools/Brush";
import Rect from "../tools/Rect";
import Circle from "../tools/Circle";
import Eraser from "../tools/Eraser";
import {Line} from "../tools/Line";
import CanvasState from "../store/canvasState";

const Toolbar = () => {

    const download = () => {
        const link = document.createElement('a');
        link.href = CanvasState.canvas.toDataURL()
        link.download = canvasState.sessionId + 'jpg';
        link.click()
    }
    return (
        <div className={'toolbar'}>
            <div className='buttons brush'
                 onClick={() => toolState.setTool(new Brush(canvasState.socket, canvasState.canvas, canvasState.sessionId))}
            />
            <div className='buttons rect'
                 onClick={() => toolState.setTool(new Rect(canvasState.socket, canvasState.canvas, canvasState.sessionId))}
            />
            <div className='buttons circle'
                 onClick={() => toolState.setTool(new Circle(canvasState.socket, canvasState.canvas, canvasState.sessionId))}
            />
            <div className='buttons eraser'
                 onClick={() => toolState.setTool(new Eraser(canvasState.socket, canvasState.canvas, canvasState.sessionId))}
            />
            <div className='buttons line'
                 onClick={() => toolState.setTool(new Line(canvasState.socket, canvasState.canvas, canvasState.sessionId))}
            />

            <div className='buttons undo'
                 onClick={() => canvasState.undo()}
            />
            <div className='buttons redo'
                 onClick={() => canvasState.redo()}
            />
            <div className='buttons save' onClick={() => download()}/>
        </div>
    );
};

export default Toolbar;