import React from 'react';
import '../styles/Toolbar.scss';
import toolState from "../store/toolState";
import canvasState from "../store/canvasState";
import {Brush} from "../tools/Brush";
import Rect from "../tools/Rect";

const Toolbar = () => {
    return (
        <div className={'toolbar'} >
            <div className='buttons brush'
                onClick={() => toolState.setTool(new Brush(canvasState.canvas))}
            />
            <div className='buttons rect'
                 onClick={() => toolState.setTool(new Rect(canvasState.canvas))}
            />
            <div className='buttons circle'/>
            <div className='buttons eraser'/>
            <div className='buttons line'/>
            <input className='palette' type='color'/>
            <div className='buttons undo'/>
            <div className='buttons r edo'/>
            <div className='buttons save'/>
        </div>
    );
};

export default Toolbar;