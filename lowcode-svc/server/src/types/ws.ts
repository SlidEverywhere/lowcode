import WebSocket from 'ws';

export interface session {
  sessionId?: string;
}

export type IWebSocketParam = WebSocket.WebSocket & session;
