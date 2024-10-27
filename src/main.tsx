import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import RouterApp from "./Router/RouterApp";
import "./index.css";
import { BrowserRouter as Router} from "react-router-dom";
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Router>
            <RouterApp/>
        </Router>
    </StrictMode>
);
