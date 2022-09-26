import React from "react";
import ReactDOM from "react-dom";
import Home from "./pages/Home/Home.js";

function App() {
    return (
        <div className="div">
            <Home />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))

