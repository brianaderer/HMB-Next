import {CATEGORIES} from "../../constants/categories";
import React, {useEffect, useRef, useContext} from "react";
import {ScreenContext} from "../../contexts";
import {scrollIntoViewWithOffset} from "../../utilities";

const Category = props => {
    const {setStickyExpanded} = useContext( ScreenContext );
    const { handler, category, index, isChecked } = props;
    const slug = CATEGORIES[category.slug] ? category.slug : 'default';
    const backgroundColor = CATEGORIES[slug].borderCardColor;
    const textColor = CATEGORIES[slug].textColor;
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
        setStickyExpanded(false);
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
                const headerHeight = document.getElementById('nav').getBoundingClientRect().height;
                setTimeout(() => {
                    scrollIntoViewWithOffset({offset: (headerHeight + 80), id: category.slug })
                }, 0); // Adjust delay as needed, 0 might be sufficient in most cases
            }
        }

    }

    return (
        <div onClick={event => handleDivClick(event)} className={`group-[.stickyContainer]:btn-sm flex flex-row items-center px-4 py-2 drop-shadow-lg justify-between border-2 bg-base-100 rounded-md ${backgroundColor} text-base-content`}>
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