import React from 'react';

const Text = React.forwardRef((props, ref) => {
    const { children, tag = 'p', className = '' } = props;
    const Element = tag;
    return (
        <Element dangerouslySetInnerHTML={{__html:children}} ref={ref} className={className} />
    );
});

export default Text;
