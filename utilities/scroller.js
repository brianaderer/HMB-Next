import {useEffect, useRef} from "react";

const scroller = props => {
    const timer = useRef(null);
    const {setTop, target} = props;
    useEffect(() => {
        // Define the scroll event handler
            const handleScroll = () => {
                if( target ){
                    const targetElement = document.getElementById(target);
                    // Find the target element each time the event fires
                    if (timer.current !== null) {
                        clearTimeout(timer.current);
                    }
                    timer.current = setTimeout(function () {
                        if( targetElement ){
                            const bound = targetElement?.getBoundingClientRect();
                            setTop(bound.top);
                        }
                    }, 30);
                }
            };

        // Add the event listener
        window.addEventListener('scroll', handleScroll, false);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('scroll', handleScroll, false);
        };

    }, [target]);
}

export {scroller};