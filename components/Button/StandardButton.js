import React from "react";


const StandardButton = props => {
    const {className = '', callback, children, type='button'} = props;
    return(
        <button type={type} className={`${className} btn btn-outline btn-secondary`} onClick={callback}>
            {children}
        </button>
    )
}
export default StandardButton;