import * as React from "react";
import { createRoot } from "react-dom/client";

function App() {
  return <h2>Hello from React!</h2>;
}

function render() {
  const root = createRoot(document.getElementById("root"));
  root.render(<App />);
}

render();
