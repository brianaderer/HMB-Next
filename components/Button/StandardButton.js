import React from "react";


const StandardButton = props => {
    const {classes, callback, children} = props;
    return(
        <button className={`${classes} btn btn-outline`} onClick={callback}>
            {children}
        </button>
    )
}
export default StandardButton;