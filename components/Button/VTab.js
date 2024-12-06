import React, {useEffect} from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";

const VTab = (props) => {
    const {
        style,
        className = '',
        callback,
        children,
        type = 'button',
        expanded,
        height,
    } = props;

    useEffect(() => {
        console.log(height);
    }, [height]);

    const buttonStyle = {
        ...style, // Spread existing styles
        ...(height ? { height } : {}), // Conditionally add height if provided
    };

    const handleClick = (event) => {
        if (callback) callback(event);
    };

    return (
        <button
            type={type}
            style={buttonStyle}
            className={`px-1 lg:px-3 btn btn-outline btn-secondary rounded-r-none border-r-2 border-r-secondary/40 group bg-accent ${
                expanded ? '' : ''
            } ${className}`}
            onClick={handleClick}
        >
            {!expanded ? (
                <FaCaretLeft
                    className="text-accent-content group-hover:text-secondary-content group-active:text-secondary-content"
                    size={20}
                />
            ) : (
                <FaCaretRight
                    className="group-active:text-secondary-content group-hover:text-secondary-content text-accent-content"
                    size={20}
                />
            )}
        </button>
    );
};

export default VTab;
