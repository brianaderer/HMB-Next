import React from "react";

const Textarea = props => {
    const {slug, handler, value, title, classes, required, placeholder, index} = props
    const {labelClasses, inputClasses, spanClasses, textAreaClasses} = classes;
    const nl2br = props => {
        const {str} = props;
        return str.replace(/(?:\r\n|\r|\n)/g, '<br />');
    }
    const br2nl = props => {
        const {str} = props;
        return str.replace(/(?:<br\s*\/?>)/g, '\r\n');
    }
    return(
        <>
        <div className="label">
            <label htmlFor={slug} className={`${labelClasses}`}>{title}
                {required ? <span className={`${spanClasses}`}>*</span> : ''}
            </label>
        </div>
            <textarea
            rows={8}
            name={slug}
            value={br2nl({str: value})}
            onChange={(e) => handler({value: nl2br({str: e.target.value}), slug: slug, index: index})}
            className={textAreaClasses}
            placeholder={placeholder}
        ></textarea>
        </>
    )
}
export default Textarea;