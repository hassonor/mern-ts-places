import { Server, Socket } from 'socket.io';


export let socketIOUserObject: Server;

export class SocketIOUserHandler {
    private io: Server;

    constructor(io: Server) {
        this.io = io;
        socketIOUserObject = io;
    }

    public listen(): void {
        this.io.on('connection', (socket: Socket) => {

        });
    }
}