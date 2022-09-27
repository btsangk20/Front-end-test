import React from "react";
import ReactDOM from "react-dom";
import { Routes, Route, Link } from "react-router-dom";
import { BrowserRouter as Router} from "react-router-dom";
import Home from "./pages/Home/Home.js";
import History from "./pages/History/History.js";
import routes from "./routers/index.js";

function App() {
    return (
        <div className="app">
            <nav className="navigate">
                <ul className="navigate-list">
                    <li>
                        <Link className="navigate-item" to={routes.home.path}>Home</Link>
                    </li>
                    <li>
                        <Link className="navigate-item" to={routes.history.path}>History</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path={routes.home.path} element={<Home />} />
                <Route path={routes.history.path} element={<History />} />
            </Routes>
        </div>
    )
}


ReactDOM.render(
    <React.StrictMode>
        <Router>
            <App />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
)
    
export default App;

