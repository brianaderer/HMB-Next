import {CATEGORIES} from "../../constants/categories";
import React, {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";

const Category = props => {
    const { handler, category, index, isChecked } = props;
    const backgroundColor = CATEGORIES[category.slug].backgroundColor;
    const textColor = CATEGORIES[category.slug].textColor;
    const activeClick = useRef(false);
    const checked = useRef(null);
    const handleDivClick = (event) => {
        activeClick.current = true;
        event.stopPropagation();
        // Check if the click was on the input checkbox
        if (event.target.type === 'checkbox') {
            handler({ bool: !isChecked, category: index });
        } else {
            if( !checked.current ){
                handler({ bool: !isChecked, category: index });
            }
           scrollIntoView();
        }
    };

    // Update the handler for checkbox change to synchronize with state
    const handleCheckboxChange = (event) => {
        handler({ bool: event.target.checked, category: index });
    };

    useEffect(() => {
        checked.current = isChecked;
    }, [isChecked]);

    useEffect(() => {
        scrollIntoView();
    }, [checked.current]);

    const scrollIntoView = props => {
        if( activeClick.current ){
            checked.current = isChecked;
            if (isChecked) {
                setTimeout(() => {
                    const elem = document.getElementById(category.slug);
                    if (elem) {
                        elem.scrollIntoView({ behavior: "smooth" });
                    }
                }, 0); // Adjust delay as needed, 0 might be sufficient in most cases
            }
        }

    }

    return (
        <div onClick={event => handleDivClick(event)} className={`group-[.stickyContainer]:btn-sm flex flex-row items-center px-4 py-2 drop-shadow-lg justify-between ${backgroundColor} ${textColor}`}>
            <label className={`mr-2`}>{category.name}</label>
            <input
                type={'checkbox'}
                className={`checkbox bg-neutral`}
                checked={isChecked}
                onChange={handleCheckboxChange}
            />
        </div>
    )
}
export default Category;