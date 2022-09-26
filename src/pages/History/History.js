import React from "react";
import "./History.css";
import Operation from "../../components/Operation/Operation";

function History () {

    const Display = () => {
        const history = JSON.parse(localStorage.getItem("history"));
        return (
            <div className="history">
                <h1>List Operation</h1>
                {history.map((item, index) => {
                    return (
                        <div className="history__row" key={index}>
                            <Operation className="history__operation" operator={item} />
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <Display/>
    );
}

export default History;