import "./App.css";

// const host = "ws://localhost:8003";
const host = "wss://slideverywhere-ws.xav1er.com";
const sessionID = "910841bd-2d34-4ee7-a8ca-fefa7c977682";

function App() {
  const ws = new WebSocket(`${host}?sessionId=${sessionID}`);
  ws.onmessage = evt => {
    console.log(JSON.parse(evt.data));
  };
  ws.onopen = () => {
    console.log("连接成功");
  };
  ws.onerror = () => {
    console.log("连接错误");
  };
  ws.onclose = () => {
    console.log("连接关闭");
  };

  return <section>test</section>;
}

export default App;
