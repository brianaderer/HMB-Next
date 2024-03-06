import React from "react";
import {FaCaretLeft, FaCaretRight} from "react-icons/fa6";
const VTab = props => {
    const {style, className = '', callback, children, type='button', expanded} = props;
    return(
        <button type={type} style={style} className={`h-48 btn btn-outline btn-secondary rounded-r-none ${!expanded ? `` : ''} ${className}`} onClick={event => callback(event)}>
            {!expanded ? <FaCaretLeft/> : <FaCaretRight/>}
        </button>
    )
}
export default VTab;