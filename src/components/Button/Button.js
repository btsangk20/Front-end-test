import React from "react"

const Button = (props) => {
    return (
        <div className={props.className} onClick={props.onClick} data-active={props.active}>{props.number}</div>
    )
}

export default Button