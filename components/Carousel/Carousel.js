import React, { useState, useEffect, useRef } from 'react';
import * as Buttons from '.././../components/Button';

const Carousel = ({ children, className, fullWidth = false, scrollInterval = 4000 }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [childrenWidths, setChildrenWidths] = useState([]);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [atRightEdge, setAtRightEdge] = useState(false);
    const [atLeftEdge, setAtLeftEdge] = useState(false);
    const [needsUpdate, setNeedsUpdate] = useState(false);
    const [scrolling, setScrolling] = useState(true)
    const ref = useRef();

    useEffect(() => {
            const interval = setInterval(() => {
                // Check if dragging is in progress. If not, advance the carousel
                if (!isDragging && scrolling && !needsUpdate) {
                    advance();
                }
            }, scrollInterval); // milliseconds

            // Cleanup function to clear the interval when the component unmounts or state changes
            return () => {
                clearInterval(interval);
            };
    }, [scrollInterval, needsUpdate, childrenWidths.length, atRightEdge, scrolling]);

    useEffect(() => {
        const checkIfAtRightEdge = () => {
            const { scrollLeft, scrollWidth, clientWidth } = ref.current;
            // Check if the user has scrolled to (or very near) the right edge of the carousel
            const rightEdge = scrollWidth - clientWidth;
            setAtRightEdge(scrollLeft >= rightEdge - 1); // A small threshold to account for rounding errors
            setAtLeftEdge( scrollLeft <= 1 );
        };

        const carousel = ref.current;
        if (carousel) {
            carousel.addEventListener('scroll', checkIfAtRightEdge);
        }

        return () => {
            if (carousel) {
                carousel.removeEventListener('scroll', checkIfAtRightEdge);
            }
        };
    }, [scrollPosition]); // Empty dependency array ensures this effect runs only once on mount

    useEffect(() => {
        if (ref.current) {
            // Access all child nodes of the ref'd element
            const widths = Array.from(ref.current.children).map(child => child.offsetLeft);
            setChildrenWidths(widths);
        }
    }, [children]); // Depend on children and fullWidth to re-calculate when they change

    const startDragging = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - ref.current.offsetLeft);
        setScrollLeft(ref.current.scrollLeft);
    };

    const stopDragging = () => {
        if( isDragging ){
            const {scrollLeft: afterScroll} = ref.current;
            handleDrag( {afterScroll} )
            setIsDragging(false);
        }
    };

    const handleDrag = props => {
        const {afterScroll} = props;
        const scrollDirection = afterScroll < scrollLeft ? 'rewind' : 'advance';
        const {newScrollPosition, newTargetScroll} = checkPositionAndIncrement({scrollDirection, afterScroll});
        setScrollPosition (newScrollPosition);
    }

    useEffect(() => {
        scroll({target: childrenWidths[scrollPosition]})
    }, [scrollPosition]);
    const checkPositionAndIncrement = props => {
        const {scrollDirection, afterScroll} = props;
        let newScrollPosition = scrollPosition;
        let newTargetScroll = childrenWidths[scrollPosition];
        let conditionMet = false;
        while (!conditionMet) {
            if ( scrollDirection === 'advance' ){
                newScrollPosition++;
                const nextScroll = childrenWidths[newScrollPosition];
                if( nextScroll > afterScroll ){
                    conditionMet = true;
                }
            } else {
                newScrollPosition--;
                if( newScrollPosition < 0 ){
                    newScrollPosition = 0;
                    conditionMet = true;
                }
                const nextScroll = childrenWidths[newScrollPosition];
                if( nextScroll < afterScroll ){
                    conditionMet = true;
                }
            }
            // Prevent exceeding array bounds
            if (newScrollPosition < 0 || newScrollPosition >= childrenWidths.length) {
                conditionMet = true; // Stop the loop if out of bounds
            }
        }
        return {newScrollPosition, newTargetScroll};
    }

    const onDrag = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - ref.current.offsetLeft;
        const walk = (x - startX) * 2; // The number 2 will determine the sensitivity of the dragging
        ref.current.scrollLeft = scrollLeft - walk;
    };

    const scroll = props => {
        const {target} = props;
        ref.current.scrollTo({ left: target, behavior: 'smooth' });
    }
    const advance = (event) => {
            event?.stopPropagation();
            setIsDragging(false);
            const newPosition = (scrollPosition + 1 < childrenWidths.length) && !atRightEdge ? scrollPosition + 1 : 0;
            const targetScrollLeft = childrenWidths[newPosition] - ref.current.offsetLeft; // Adjust if needed
            setScrollPosition(newPosition);
    }
    const rewind = (event) => {
            event?.stopPropagation();
            const { scrollLeft: beforeScroll } = ref.current;
            const newPosition = (scrollPosition - 1 >= 0) ? scrollPosition - 1 : childrenWidths.length - 1;

            const targetScrollLeft = childrenWidths[newPosition] - ref.current.offsetLeft; // Adjust if needed
            setScrollPosition(newPosition);
            setTimeout(() => {
                const { scrollLeft: afterScroll } = ref.current;
                setNeedsUpdate( beforeScroll === afterScroll );
            }, 75);
    }

    useEffect(() => {
        console.log(needsUpdate)
        if( needsUpdate ){
            rewind();
        }
    }, [scrollPosition, needsUpdate]);
    const handleExit = props => {
        stopDragging();
        setScrolling(true);
    }
    const handleEnter = props => {
        setScrolling(false);
    }

    return (
        <>
            <div className={`overflow-hidden flex w-full ${fullWidth === 'noCrop' ? '' : `h-80`} ${className}`}>
                <div
                    ref={ref}
                    onMouseEnter={handleEnter}
                    onMouseDown={startDragging}
                    onMouseLeave={handleExit}
                    onMouseUp={stopDragging}
                    onMouseMove={onDrag}
                    className={`cursor-grab object-cover flex flex-row overflow-x-scroll no-scrollbar ${isDragging ? 'cursor-grabbing' : ''}`}
                >
                    {children}
                </div>
            </div>
            <div className="absolute left-full bottom-1/2">
                <Buttons.StandardButton className={``} callback={advance}>Advance</Buttons.StandardButton>
            </div>
            <div className="absolute right-full bottom-1/2">
                <Buttons.StandardButton className={``} callback={rewind}>Rewind</Buttons.StandardButton>
            </div>
        </>
    );
};

export default Carousel;
