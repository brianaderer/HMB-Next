import React from "react";

const Textarea = props => {
    const {slug, handler, value, title, classes, required} = props
    const {labelClasses, inputClasses, spanClasses} = classes;
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
        <label htmlFor={slug} className={`${labelClasses}`}>{title}<span className={`${spanClasses}`}>*</span></label>
        <textarea
            rows={8}
            name={slug}
            value={br2nl({str: value})}
            onChange={(e) => handler({value: nl2br({str: e.target.value}), slug: slug})}
            className={inputClasses}
        ></textarea>
        </>
    )
}
export default Textarea;