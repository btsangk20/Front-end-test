import React from "react"

function Row (props) {
    return (
        <div className={props.className}>
            {props.children}
        </div>
    )
}

export default Row