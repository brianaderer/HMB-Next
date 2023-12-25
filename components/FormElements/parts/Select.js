import React, {useEffect} from "react";

const Select = props => {
    //@Todo options are coming in as key:key pair
    const{options, classes, slug, title, handler, value} = props;
    const{spanClasses, labelClasses, inputClasses} = classes;
    useEffect(() => {
        const key = Object.keys(options)[0];
        handler({value: key, slug: slug});
    }, []);
    return(
        <>
            <label htmlFor={slug} className={`${labelClasses} mb-2`} onChange={handler}>{title}</label>
            <select
                value={value}
                onChange={(e) => handler({value: e.target.value, slug: slug})}
                className={`${inputClasses} bg-hmbBlue-100 dark:text-hmbBlue-700 rounded-2xl`}>
                {
                    Object.keys(options).map((option, index) => {
                        return(
                            <option className={`${inputClasses} bg-hmbBlue-300`} value={option} key={index}
                            >{options[option]}</option>
                        )
                    })
                }
            </select>
        </>
    )
}
export default Select;