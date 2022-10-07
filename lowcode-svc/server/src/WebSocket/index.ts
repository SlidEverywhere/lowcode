import { Code } from '@/code';
import { IWebSocketParam } from '@/types/ws';
import WebSocket from 'ws';

const wss = new WebSocket.Server({ port: 8003 });

wss.on('connection', async (ws: IWebSocketParam, req) => {
  ws.sessionId = req.url.split('/')[1];
  ws.on('message', msg => {
    console.log(msg);
  });
});

export const broadcast = async <T = any>(data: T, sessionId: string) => {
  wss.clients.forEach(function each(client: IWebSocketParam) {
    console.log('sessionId: ' + client.sessionId);
    if (client.sessionId === sessionId) {
      client.send(
        JSON.stringify({
          code: Code.SUCCESS,
          message: '广播成功',
          data
        })
      );
    }
  });
};
