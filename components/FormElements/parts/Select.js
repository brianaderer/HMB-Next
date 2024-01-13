import React, {useEffect} from "react";

const Select = props => {
    //@Todo options are coming in as key:key pair
    const{options, classes, slug, title, handler, value} = props;
    const{selectClasses ,spanClasses, labelClasses, inputClasses} = classes;
    useEffect(() => {
        const key = Object.keys(options)[0];
        handler({value: key, slug: slug});
    }, []);
    return(
        <>
            <div className="label">
                <label htmlFor={slug} className={`${labelClasses} mb-2`} onChange={handler}>{title}</label>
            </div>
                <select
                value={value}
                onChange={(e) => handler({value: e.target.value, slug: slug})}
                className={`${selectClasses}`}>
                {
                    Object.keys(options).map((option, index) => {
                        return(
                            <option value={option} key={index}
                            >{options[option]}</option>
                        )
                    })
                }
            </select>
        </>
    )
}
export default Select;