import React from "react";

const Text = props => {
    const {slug, handler, classes, value, title, required} = props;
    const {labelClasses, inputClasses, spanClasses} = classes;
    return(
        <>
        <div className="label">
            <label htmlFor={slug} className={`${labelClasses}`}>{title}<span className={`${spanClasses}`}>*</span></label>
        </div>
            <input
                type="text"
                name={slug}
                value={value}
                onChange={(e) => handler({value: e.target.value, slug: slug})}
                className={`${inputClasses}`}
            />
        </>
    )
}
export default Text;