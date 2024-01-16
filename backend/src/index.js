const {WebSocketServer} = require("ws");

// Websocket server
const wss = new WebSocketServer({ port: 5000 });

function heartbeat() {
    this.isAlive = true;
}
wss.on('connection', function connection(ws) {
    ws.isAlive = true;
    ws.on('message', function message(data) {
        console.log('received: %s', data);
    });
    ws.on('error', console.error);
    ws.on('pong', heartbeat);
    ws.send("Successfully connected");
});

const interval = setInterval(function ping() {
    wss.clients.forEach(function each(ws) {
        if (ws.isAlive === false) return ws.terminate();

        ws.isAlive = false;
        ws.ping();
    });
}, 30000);

wss.on('close', function close() {
    clearInterval(interval);
});