import { FastifyInstance } from 'fastify';

export const activeConnections: {
    webSocket: WebSocket,
    roomsSubscribed: string[],
}[] = [];

type Payload = {
    type: 'ping',
} | {
    type: 'initRequest',
}

export const initWebsocket = async(fastify: FastifyInstance) => {
    await fastify.register(function (fastify) {
        fastify.get('/ws', { websocket: true }, (newSocket: WebSocket) => {
            newSocket.send(JSON.stringify({ type: 'initRequest' }));
            activeConnections.push({
                webSocket: newSocket,
                roomsSubscribed: [],
            });

            newSocket.addEventListener('message', (message: MessageEvent<string>) => {
                try {
                    const data = JSON.parse(message.data) as Payload;
                    handleIncomingMessage(newSocket, data);
                } catch (error) {
                    console.error('Invalid JSON received:', message.data);
                }
            });

            newSocket.addEventListener('close', () => {
                const index = activeConnections.findIndex((s) => s.webSocket === newSocket);
                if (index > -1) {
                    activeConnections.splice(index, 1);
                }
            });
        });
    });
};

export const sendToAllSocket = (payload: Payload) => {
    for (const conn of activeConnections) {
        conn.webSocket.send(JSON.stringify(payload));
    }
};

export const sendToSubscribers = (roomId: string, payload: Payload) => {
    for (const conn of activeConnections) {
        if (conn.roomsSubscribed.includes(roomId)) {
            conn.webSocket.send(JSON.stringify(payload));
        }
    }
};

const handleIncomingMessage = (socket: WebSocket, payload: Payload) => {
    switch (payload.type) {
        case 'ping':
            console.log('Ping');
            break;

        // These are only ever sent by the server
        case 'initRequest':
            break;

        default:
            payload satisfies never;
    }
};
