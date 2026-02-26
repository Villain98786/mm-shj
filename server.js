const express = require('express'); 
const { WebSocketServer } = require('ws'); 
const app = express();

const server = app.listen(process.env.PORT || 8080, () => { 
    console.log('🎮 Mini Militia Server ON!'); 
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => { 
    console.log('✅ Player Connected!'); 
    ws.on('message', (data) => { 
        wss.clients.forEach((client) => { 
            // 'WebSocket.OPEN' ki jagah '1' use karein
            if (client.readyState === 1) { 
                client.send(data); 
            } 
        }); 
    }); 
    ws.on('close', () => console.log('❌ Player Left')); 
});

app.get('/', (req, res) => { 
    res.send('🚀 Mini Militia Server Live!'); 
});
