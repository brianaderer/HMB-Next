import React from "react";

const Email = props => {
    const {slug, handler, value, title, classes, required} = props;
    const {labelClasses, inputClasses, spanClasses} = classes;
    return(
        <>
            <div className={`label`}><label htmlFor={slug} className={`${labelClasses}`}>{title}
                {required ? <span className={`${spanClasses}`}>*</span> : ''}
            </label>
            </div>
            <input
                type="email"
                name={slug}
                value={value}
                onChange={(e) => handler({value: e.target.value, slug: slug})}
                className={`${inputClasses}`}
            />
        </>
    )
}
export default Email;