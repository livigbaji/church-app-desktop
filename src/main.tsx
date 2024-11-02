import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.css";

// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <div>
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */}
  </div>
);

postMessage({ payload: "removeLoading" }, "*");
