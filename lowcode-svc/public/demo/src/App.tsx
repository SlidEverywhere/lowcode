import "./App.css";

// const host = "ws://localhost:8003"
const host = "wss://slideverywhere-ws.xav1er.com";
const sessionID = "41533361-51cf-4826-b310-03a8c08917e4";
// const sessionID = "41533361-51cf-4826-b310-03a8c08917e4";

function App() {
  const ws = new WebSocket(`${host}/${sessionID}`);
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
