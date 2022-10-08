import "./App.css";

const host = "ws://localhost:8003";
// const host = "wss://slideverywhere-ws.xav1er.com";
const sessionID = "a66ff0de-fbb2-4b86-a7a5-af0d10eccd01";

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
