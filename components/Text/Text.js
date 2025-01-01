import React, {useEffect, useState} from 'react';

const Text = React.forwardRef((props, ref) => {
    const { children, tag = 'p', className = '' } = props;
    const Element = tag;
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <p></p>;
    }
    return (
        <Element dangerouslySetInnerHTML={{__html:children}} ref={ref} className={className}/>
    );
});

export default Text;
