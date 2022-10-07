import WebSocket from 'ws';
const wss = new WebSocket.Server({ port: 8003 });

type paramType = {
  send: Function;
};

let param: paramType;

wss.on('connection', function (ws, req) {
  param = ws;
  ws.on('message', function (msg) {
    console.log(msg);
  });
});

export default function send(data: object) {
  param.send(JSON.stringify(data));
}
