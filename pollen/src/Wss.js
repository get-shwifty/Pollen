
export default class Wss {

    /**
     * @type WebSocket
     */
    ws;

    ip = 'ws://188.213.31.63:3012';

    static READY_STATE_MAP = {
        0: 'CONNECTING',
        1: 'OPEN',
        2: 'CLOSING',
        3: 'CLOSED'
    };

    constructor(handleMessage) {
        this.handleMessageCallback = handleMessage;
        this.connect();
    }

    connect = () => {
        console.log('trying to connect to ' + this.ip);
        this.ws = new WebSocket(this.ip);
        this.ws.onerror = () => console.error("websocket connected");
        this.ws.onopen = () => {
            console.log("websocket connected");
            this.send('login', 'alexis');
        };
        this.ws.onclose = () => {
            console.log("websocket closed");
            setTimeout(this.connect, 3000);
        };
        this.ws.onmessage = this.handleMessage;
    };

    send(type, data) {
        if(this.ws.readyState !== WebSocket.OPEN) {
            console.error('error: try to send a message in mode', Wss.READY_STATE_MAP[this.ws.readyState]);
            return;
        }
        this.ws
            .send(JSON.stringify({
            type,
            data
        }));
    }

    handleMessage = (msg) => {
        console.log(JSON.parse(msg.data));
        this.handleMessageCallback(JSON.parse(msg.data));
    }
}
