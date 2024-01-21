import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { PrimeReactProvider } from "primereact/api";
import { TodoProvider } from "./context/TodoContext";
// import "primereact/resources/themes/lara-light-blue/theme.css"; // Choose the theme you want
// import "primereact/resources/themes/lara-dark-blue/theme.css"; // Choose the theme you want
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <PrimeReactProvider>
      <TodoProvider>
        <App />
      </TodoProvider>
    </PrimeReactProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
