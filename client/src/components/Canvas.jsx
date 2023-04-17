import React, {useEffect, useRef} from 'react';
import '../styles/Canvas.scss';
import {observer} from "mobx-react-lite";
import {Brush} from "../tools/Brush";
import CanvasState from "../store/canvasState";
import ToolState from "../store/toolState";
import canvasState from "../store/canvasState";
import {useParams} from "react-router-dom";
import Rect from "../tools/Rect";
import Eraser from "../tools/Eraser";
import {Line} from "../tools/Line";
import Circle from "../tools/Circle";
import axios from "axios";

const Canvas = observer(() => {

    const canvasRef = useRef()
    useEffect(() => {
        CanvasState.setCanvas(canvasRef.current);
    }, [])


    const params = useParams();
    useEffect(() => {
        if (canvasState.username) {
            const socket = new WebSocket(process.env.REACT_APP_API_URL);
            const id = params.id;
            canvasState.setSocket(socket);
            canvasState.setSessionId(id);
            const msg = JSON.stringify({
                id, method: 'connection', username: CanvasState.username
            });

            ToolState.setTool(new Brush(socket, CanvasState.canvas, id))

            socket.onopen = () => socket.send(msg);
            axios.get(`http://localhost:5000/image?id=${params.id}`)
                .then(response => {
                    const canvasURL = 'data:image/png;base64,' + response.data;
                    const img = new Image();
                    img.src = canvasURL;
                    img.onload = () => {
                        canvasState.ctx.clearRect(0, 0, canvasState.canvas.width, canvasState.canvas.height)
                        canvasState.ctx.drawImage(img, 0, 0, canvasState.canvas.width, canvasState.canvas.height)
                        canvasState.ctx.stroke();
                    }
                });

            socket.onmessage = function (event) {
                const data = event.data
                let message = JSON.parse(data);
                switch (message.method) {
                    case 'connection':
                        console.log(message.data);
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
        switch (type) {
            case 'Brush':
                Brush.draw(event.figure.x, event.figure.y, canvasState.ctx,
                    event.figure.color,
                    event.figure.thickness)
                break
            case 'Finish':
                canvasState.ctx.beginPath();
                axios.post(`http://localhost:5000/image?id=${params.id}`, {
                    image:
                        canvasState.canvas.toDataURL().replace('data:image/png;base64,', '')
                })
                break
            case 'Rect':
                Rect.draw(event.figure.x,
                    event.figure.y,
                    event.figure.width,
                    event.figure.height,
                    canvasState.ctx,
                    event.figure.color,
                    event.figure.thickness,
                )
                break
            case 'Eraser':
                Eraser.draw(event.figure.x, event.figure.y, canvasState.ctx,
                    event.figure.thickness)
                break
            case 'Circle':
                Circle.draw(event.figure.startX, event.figure.startY,
                    event.figure.radius, canvasState.ctx,
                    event.figure.thickness,
                    event.figure.color)
                break
            case 'Line':
                Line.draw(event.figure.startX, event.figure.startY,
                    event.figure.x, event.figure.y, canvasState.ctx,
                    event.figure.thickness,
                    event.figure.color)
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