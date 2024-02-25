import React from "react";
const StandardButton = props => {
    const {style, className = '', callback, children, type='button'} = props;
    return(
        <button type={type} style={style} className={`btn btn-sm lg:btn-md btn-outline btn-secondary ${className}`} onClick={event => callback(event)}>
            {children}
        </button>
    )
}
export default StandardButton;