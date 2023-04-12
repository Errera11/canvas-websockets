import React, {useEffect, useRef} from 'react';
import '../styles/Canvas.scss';
import {observer} from "mobx-react-lite";
import {Brush} from "../tools/Brush";
import CanvasState from "../store/canvasState";
import ToolState from "../store/toolState";
import canvasState from "../store/canvasState";


const Canvas = observer(() => {

    const canvasRef = useRef()
    useEffect(() => {
        CanvasState.setCanvas(canvasRef.current);
        ToolState.setTool(new Brush(CanvasState.canvas))
    }, [])
    return (
        <div className='canvas'>
            <canvas onMouseDown={() => canvasState.snapshot()} ref={canvasRef} width={800} height={400}/>
        </div>
    );
});

export default Canvas;