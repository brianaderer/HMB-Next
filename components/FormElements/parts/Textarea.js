import React from "react";

const Textarea = props => {
    const {slug, handler, value, title, classes, required} = props
    const {labelClasses, inputClasses, spanClasses} = classes;
    return(
        <>
        <label htmlFor={slug} className={`${labelClasses}`}>{title}<span className={`${spanClasses}`}>*</span></label>
        <textarea
            name={slug}
            value={value}
            onChange={(e) => handler({value: e.target.value, slug: slug})}
            className={inputClasses}
        ></textarea>
        </>
    )
}
export default Textarea;