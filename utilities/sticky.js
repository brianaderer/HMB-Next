import {useEffect, useRef, useState} from "react";
import {scroller} from "./scroller";

const stickyFX = props => {
    const {stickyRef, target} = props;
    const [scroll, setScroll] = useState(false);
    const [top, setTop] = useState(0);
    useEffect(() => {
        if(stickyRef.current) {
            stickyRef.current.style.top = top < 0 ? `${-top + 90}px` : '0px';
        }
    }, [top]);
    scroller({target, setTop});
 // Empty dependency array ensures this runs only once when the component mounts
}

export {stickyFX};