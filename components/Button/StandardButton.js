import React from "react";
const StandardButton = props => {
    const {className = '', callback, children, type='button'} = props;
    return(
        <button type={type} className={`btn btn-sm lg:btn-md btn-outline btn-secondary ${className}`} onClick={event => callback(event)}>
            {children}
        </button>
    )
}
export default StandardButton;