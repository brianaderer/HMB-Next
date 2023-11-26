import React from "react";

const Email = props => {
    const {slug, handler, value, title, classes, required} = props
    const {labelClasses, inputClasses, spanClasses} = classes;
    return(
        <>
            <label htmlFor={slug} className={`${labelClasses}`}>{title}<span className={`${spanClasses}`}>*</span></label>
            <input
                type="email"
                name={slug}
                value={value}
                onChange={(e) => handler(e.target.value)}
                className={`${inputClasses}`}
            />
        </>
    )
}
export default Email;