import React, {useEffect, useRef} from 'react';
import '../styles/Canvas.scss';
import {observer} from "mobx-react-lite";
import {Brush} from "../tools/Brush";
import CanvasState from "../store/canvasState";
import ToolState from "../store/toolState";
import canvasState from "../store/canvasState";
import {useParams} from "react-router-dom";


const Canvas = observer(() => {

    const canvasRef = useRef()
    useEffect(() => {
        CanvasState.setCanvas(canvasRef.current);
        ToolState.setTool(new Brush(CanvasState.canvas))
    }, [])


    const params = useParams();
    useEffect(() => {

        if(canvasState.username) {
            const socket = new WebSocket('ws://localhost:5000');
            const id = params.id;
            const message = {
                id, method: 'connection', username: CanvasState.username
            }
            const msg = JSON.stringify(message);
            socket.onopen = () => socket.send(msg);

            socket.onmessage = function(event)
            {
                console.log(event.data)
            }
        }
    }, [canvasState.username])
    return (
        <div className='canvas'>
            <canvas onMouseDown={() => canvasState.snapshot()} ref={canvasRef} width={800} height={400}/>
        </div>
    );
});

export default Canvas;