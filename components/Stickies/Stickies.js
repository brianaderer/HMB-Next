import React, { useContext, useEffect, useRef } from "react";
import { StickyContext } from "../../contexts";

const Stickies = props => {
    const stickies = useContext(StickyContext);
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current && stickies instanceof HTMLElement) {
            containerRef.current.appendChild(stickies);
        }
    }, [stickies]);

    return <div className={`hidden transition-all `} ref={containerRef}></div>;
}

export default Stickies;
