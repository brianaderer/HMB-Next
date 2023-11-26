import React from "react";

const Text = props => {
    const {slug, handler, classes, value, title, required} = props
    const {labelClasses, inputClasses, spanClasses} = classes;
    return(
        <>
        <label htmlFor={slug} className={`${labelClasses}`}>{title}<span className={`${spanClasses}`}>*</span></label>
            <input
                type="text"
                name={slug}
                value={value}
                onChange={(e) => handler(e.target.value)}
                className={`${inputClasses}`}
            />
        </>
    )
}
export default Text;