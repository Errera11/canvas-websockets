require('dotenv').config({path: './.env'})
const app = require('express')();
const expressWs = require('express-ws')(app);
const Wss = expressWs.getWss();
const fs = require('fs')
const path = require('path')
const cors = require('cors')
const express = require('express')

app.use(cors())
app.use(express.json())
const PORT=process.env.PORT;
app.ws('/', (ws, req) => {
    ws.on('message', msg => {
        message = JSON.parse(msg);
        switch(message.method){
            case 'connection':
                connectionHandler(ws, message);
                break
            case 'draw':
                drawHandler(ws, message);
                break
        }
    })
})

app.post('/image', (req, res) => {
    fs.writeFileSync(path.resolve(__dirname, "images", req.query.id + '.jpg'), req.body.image, 'base64')
})

app.get('/image', (req, res) => {
    const data = fs.readFileSync(path.resolve(__dirname, "images", req.query.id + '.jpg'))
    res.json(data.toString('base64'));
})

const connectionHandler = (ws, message) => {
    ws.id = message.id;
    Wss.clients.forEach(client => {
        if(client.id == message.id) client.send(JSON.stringify({
            data: `User ${message.username} connected`,
            method: 'connection'
        }));
    })
}

const drawHandler = (ws, message) => {
    Wss.clients.forEach(client => {
        if(client.id == message.id) client.send(JSON.stringify(message));
    })
}
app.listen(PORT, () => console.log("Started with " + PORT))
