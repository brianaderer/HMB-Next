import React, {useContext, useEffect, useRef, useState} from "react";
import { StickyContext } from "../../contexts";
import {scroller} from "../../utilities/scroller";
import {ScreenContext} from "../../contexts";

const Stickies = props => {
    const {setOffscreen, setNavHeight} = props;
    const [top, setTop] = useState(0);
    const stickies = useContext(StickyContext);
    const screenInfo = useContext(ScreenContext);
    const containerRef = useRef(null);
    const hasAppended = useRef(false);
    const id = stickies?.id;
    useEffect(() => {
        if (containerRef.current && stickies instanceof HTMLElement && !hasAppended.current) {
            const clonedStickies = stickies.cloneNode(true);
            clonedStickies.removeAttribute('id');
            // Append the cloned element to the container
            containerRef.current.appendChild(clonedStickies);

            // Mark that cloning and appending have been done
            hasAppended.current = true;
        }
    }, [stickies]);

    useEffect(() => {
        const navHeight = screenInfo.navHeight;
        const offscreen = -(top) > navHeight;
        setOffscreen( offscreen );
        setNavHeight( navHeight );
    }, [top]);

    scroller({target: id, setTop});


    return <div className={`transition-all`} ref={containerRef}></div>;
}

export default Stickies;
