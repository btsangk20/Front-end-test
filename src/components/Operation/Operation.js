import React from "react";

function Operation (props) {
    return (
        <div className={props.className}>
            {props.operator}
        </div>
    );
}

export default Operation;