require('dotenv').config({path: './.env'})
const app = require('express')();
const expressWs = require('express-ws')(app);
const Wss = expressWs.getWss();

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

const connectionHandler = (ws, message) => {
    ws.id = message.id;
    Wss.clients.forEach(client => {
        if(client.id == message.id) client.send(JSON.stringify({
            data: `User ${message.username} connected`,
            type: 'connection'
        }));
    })
}

const drawHandler = (ws, message) => {
    Wss.clients.forEach(client => {
        if(client.id == message.id) client.send(JSON.stringify(message));
    })
}
app.listen(PORT, () => console.log("Started with " + PORT))
