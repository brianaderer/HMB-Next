import React from "react";


const StandardButton = props => {
    const {classes = '', callback, children, type='button'} = props;
    return(
        <button type={type} className={`${classes} btn btn-outline`} onClick={callback}>
            {children}
        </button>
    )
}
export default StandardButton;