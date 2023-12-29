import React from "react";
const Text = props => {
    const {children, tag, className = ''} = props;
    const elementProps = {
        className,
    }
    return React.createElement(tag, elementProps, children);
}
export default Text;