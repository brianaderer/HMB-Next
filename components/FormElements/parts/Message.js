import React from "react";

const Message = props => {
    const {slug, handler, classes, value, title, required, message} = props;
    console.log(props);
    const {labelClasses, inputClasses, spanClasses} = classes;
    return(
        <>
            <p className={`${inputClasses}`}>
                {message}
            </p>
        </>
    )
}
export default Message;