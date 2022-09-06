import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import { ContextProvider } from "./contexts/ContextProvider";
import { BrowserRouter } from "react-router-dom";

// </ContextProvider>
ReactDOM.render(
  <BrowserRouter>
    <div className="app">
      <ContextProvider>
        <App />
      </ContextProvider>
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);
