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
    }, [])


    const params = useParams();
    useEffect(() => {
        if(canvasState.username) {
            const socket = new WebSocket(process.env.REACT_APP_API_URL);
            const id = params.id;
            const message = {
                id, method: 'connection', username: CanvasState.username
            }
            const msg = JSON.stringify(message);

            ToolState.setTool(new Brush(socket, CanvasState.canvas, id))

            socket.onopen = () => socket.send(msg);

            socket.onmessage = function(event)
            {
                const data = event.data
                let message = JSON.parse(data);
                switch (message.method) {
                    case 'connection':
                        console.log(event.data);
                        break;
                    case 'draw':
                        draw(message);
                        break
                }
            }
        }
    }, [canvasState.username])

    const draw = (event) => {
        const type = event.figure.type;
        switch(type) {
            case 'Brush':
                Brush.draw(event.figure.x, event.figure.y, canvasState.ctx)
                break
        }
    }
    return (
        <div className='canvas'>
            <canvas onMouseDown={() => canvasState.snapshot()} ref={canvasRef} width={800} height={400}/>
        </div>
    );
});

export default Canvas;