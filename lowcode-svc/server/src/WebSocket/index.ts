import { Code } from '@/code';
import { IWebSocketParam } from '@/types/ws';
import WebSocket from 'ws';
import url from 'url';
const wss = new WebSocket.Server({ port: 8003 });

wss.on('connection', async (ws: IWebSocketParam, req) => {
  ws.sessionId = url.parse(req.url, true).query.sessionId as string;
  ws.on('message', msg => {
    console.log(msg);
  });
});

export const broadcast = async <T = any>(data: T, sessionId: string) => {
  wss.clients.forEach(function each(client: IWebSocketParam) {
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
