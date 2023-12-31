import { useEffect, useRef, useState } from "react";

const Sticky = props => {
    const { children, target, classes = '' } = props;
    const timer = useRef(null);
    const [scroll, setScroll] = useState(false);
    const [top, setTop] = useState(0);
    const stickyRef = useRef(null);

    useEffect(() => {
        if(stickyRef.current) {
            stickyRef.current.style.top = top < 0 ? `${-top + 50}px` : '0px';
        }
    }, [top]);


    useEffect(() => {
        // Define the scroll event handler
        const handleScroll = () => {
            const targetElement = document.getElementById(target);
            // Find the target element each time the event fires
            if (timer.current !== null) {
                clearTimeout(timer.current);
            }
            timer.current = setTimeout(function() {
                const bound = targetElement.getBoundingClientRect();
                setTop(bound.top);
            }, 30);
        };

        // Add the event listener
        window.addEventListener('scroll', handleScroll, false);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('scroll', handleScroll, false);
        };
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    return(
        <>
            <div id={`Sticky`} ref={stickyRef} className={`${classes} absolute transition-all`}>
                {children}
            </div>
        </>
    )
}
export default Sticky;
