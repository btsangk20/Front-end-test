import React from "react";

const Operation = (props) => {
    return (
        <div className={props.className}>
            {props.operator}
        </div>
    );
}

export default Operation;