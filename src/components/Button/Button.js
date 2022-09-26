import React from "react"

function Button (props) {
    return (
        <div className={props.className}>{props.number}</div>
    )
}

export default Button