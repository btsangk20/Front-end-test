import React from "react"

function Button (props) {
    return (
        <div className={props.className} onClick={props.onClick}>{props.number}</div>
    )
}

export default Button