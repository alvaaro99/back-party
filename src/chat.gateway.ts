import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ namespace: '/chat', cors: true })
export class ChatGateway implements OnGatewayConnection {
  constructor() {}
  @WebSocketServer() webSocketServer: Server;

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`${client.id} connected`);
  }

  @SubscribeMessage('newMessageServer')
  handleMessage(client: Socket, payload: { sender: string; message: string }) {
    this.webSocketServer.emit('newMessageClient', payload);
  }
}
