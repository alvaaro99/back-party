import { Logger } from '@nestjs/common';
import { OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io'

@WebSocketGateway({namespace:'/chat'})
export class ChatGateway implements OnGatewayConnection{

  @WebSocketServer() webSocketServer: Server;

  handleConnection(client: Socket, ...args: any[]) {
    const logger = new Logger()
    logger.log(args)
    logger.log(`${client.id} connected`)
  }

  @SubscribeMessage('newMessageServer')
  handleMessage(client: Socket, payload: {sender: string, message: string}) {
    this.webSocketServer.emit('newMessageClient',payload)
  }
}
