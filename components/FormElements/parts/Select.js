import React from "react";

const Select = props => {
    const{options, classes, slug, title} = props;
    const{spanClasses, labelClasses, inputClasses} = classes;
    return(
        <>
            <label htmlFor={slug} className={`${labelClasses} mb-2`}>{title}</label>
            <select className={`${inputClasses} bg-hmbBlue-100 dark:text-hmbBlue-700 rounded-2xl`}>
                {
                    Object.keys(options).map((option, index) => {
                        return(
                            <option className={`${inputClasses} bg-hmbBlue-300`} value={option} key={index}>{options[option]}</option>
                        )
                    })
                }
            </select>
        </>
    )
}
export default Select;