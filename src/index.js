import log from "assets/misc/console-log";
import dayjs from "dayjs";
import * as localizedFormat from "dayjs/plugin/localizedFormat";
import ReactDOM from "react-dom/client";
import App from "./App";

dayjs.extend(localizedFormat);

fetch(log)
  .then((r) => r.text())
  .then((text) => console.log(`%c${text}`, "color: #4496E0"));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
