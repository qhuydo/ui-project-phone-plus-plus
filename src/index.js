import ReactDOM from "react-dom/client";
import App from "./App";
import log from "assets/misc/console-log";

fetch(log)
  .then((r) => r.text())
  .then((text) => console.log(`%c${text}`, "color: #4496E0"));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
