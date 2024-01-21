import {CATEGORIES} from "../../constants/categories";
import React, {useEffect, useRef} from "react";
import {useRouter} from "next/router";

const Category = props => {
    const { handler, category, index, isChecked } = props;
    const backgroundColor = CATEGORIES[category.slug].backgroundColor;
    const textColor = CATEGORIES[category.slug].textColor;
    const router = useRouter();
    const slug = category.slug;
    const checked = useRef(null);
    const handleDivClick = () => {
        // Call the handler with the new state
        handler({ bool: !isChecked, category: index });
    };

    // Update the handler for checkbox change to synchronize with state
    const handleCheckboxChange = (event) => {
        handler({ bool: event.target.checked, category: index });
    };

    useEffect(() => {
        checked.current = isChecked;
    }, [isChecked]);

    useEffect(() => {
        checked.current = isChecked;

        if (isChecked) {
            setTimeout(() => {
                const elem = document.getElementById(category.slug);
                if (elem) {
                    elem.scrollIntoView({ behavior: "smooth" });
                }
            }, 0); // Adjust delay as needed, 0 might be sufficient in most cases
        }
    }, [checked.current]);

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