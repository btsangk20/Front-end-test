import React from "react"

const Row = (props) => {
    return (
        <div className={props.className}>
            {props.children}
        </div>
    )
}

export default Row