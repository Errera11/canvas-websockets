import React from 'react';
import '../styles/Toolbar.scss';
import toolState from "../store/toolState";
import canvasState from "../store/canvasState";
import {Brush} from "../tools/Brush";
import Rect from "../tools/Rect";
import Circle from "../tools/Circle";
import Eraser from "../tools/Eraser";
import {Line} from "../tools/Line";

const Toolbar = () => {
    return (
        <div className={'toolbar'} >
            <div className='buttons brush'
                onClick={() => toolState.setTool(new Brush(canvasState.canvas))}
            />
            <div className='buttons rect'
                 onClick={() => toolState.setTool(new Rect(canvasState.canvas))}
            />
            <div className='buttons circle'
                 onClick={() => toolState.setTool(new Circle(canvasState.canvas))}
            />
            <div className='buttons eraser'
                 onClick={() => toolState.setTool(new Eraser(canvasState.canvas))}
            />
            <div className='buttons line'
                 onClick={() => toolState.setTool(new Line(canvasState.canvas))}
            />

            <div className='buttons undo'/>
            <div className='buttons redo'/>
            <div className='buttons save'/>
        </div>
    );
};

export default Toolbar;