import React from "react";
import "./History.css";
import Operation from "../../components/Operation/Operation";

function History () {

    const Clear = () => {
        // clear history in local storage
        localStorage.setItem("history", JSON.stringify([]));
        window.location.reload();
    }

    const Display = () => {
        const history = JSON.parse(localStorage.getItem("history"));
        return (
            <div className="history">
                <h1>List Operation</h1>
                {history.map((item, index) => {
                    return (
                        <div className="history-row" key={index}>
                            <Operation className="history-operation" operator={item} />
                        </div>
                    )
                })}
                <button onClick={Clear}>Clear</button>
            </div>
        )
    }

    return (
        <Display/>
    );
}

export default History;