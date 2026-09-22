import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css"
import App from "./app/App.tsx"
import { registerComponents } from "./features/animation/engine/components/registerComponents.ts";

/**
 * To register all the components we have
 * available in our editor.
 */
registerComponents();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);