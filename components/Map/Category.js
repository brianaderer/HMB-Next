import {CATEGORIES} from "../../constants/categories";
import React, {useState} from "react";

const Category = props => {
    const { handler, category, index, isChecked } = props;
    const backgroundColor = CATEGORIES[category.slug].backgroundColor;
    const textColor = CATEGORIES[category.slug].textColor;


    const handleDivClick = () => {
        // Call the handler with the new state
        handler({ bool: !isChecked, category: index });
    };

    // Update the handler for checkbox change to synchronize with state
    const handleCheckboxChange = (event) => {
        handler({ bool: event.target.checked, category: index });
    };

    return (
        <div onClick={handleDivClick} className={`group-[.stickyContainer]:btn-sm flex flex-row items-center px-4 py-2 drop-shadow-lg justify-between ${backgroundColor} ${textColor}`}>
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