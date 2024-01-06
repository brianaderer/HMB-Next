import React from "react";

const Text = props => {
    const { children, tag = 'p', className = '' } = props;
    return (React.createElement(tag, { className: className,
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML: { __html: children }}));
}

export default Text;
