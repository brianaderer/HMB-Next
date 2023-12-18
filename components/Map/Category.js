import {CATEGORIES} from "../../constants/categories";
import React, {useState} from "react";

const Category = props => {
    const { handler, category, index } = props;
    const backgroundColor = CATEGORIES[category.slug].backgroundColor;
    const textColor = CATEGORIES[category.slug].textColor;

    // State to manage the checkbox's checked status
    const [isChecked, setIsChecked] = useState(true);

    const handleDivClick = () => {
        // Toggle the checkbox's checked state
        setIsChecked(!isChecked);

        // Call the handler with the new state
        handler({ bool: !isChecked, category: index });
    };

    // Update the handler for checkbox change to synchronize with state
    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
        handler({ bool: event.target.checked, category: index });
    };

    return (
        <div onClick={handleDivClick} className={`flex flex-row items-center p-4 drop-shadow-lg rounded ${backgroundColor} ${textColor}`}>
            <label className={`mr-2`}>{category.name}</label>
            <input
                type={'checkbox'}
                checked={isChecked}
                onChange={handleCheckboxChange}
            />
        </div>
    )
}
export default Category;