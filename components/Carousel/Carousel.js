import React, { useState, useEffect, useRef, useContext } from 'react';
import * as Buttons from '.././../components/Button';
import { TbSpeedboat } from "react-icons/tb";
import {ScreenContext} from "../../contexts";

const Carousel = ({ children, className, fullWidth = false, scrollInterval = 4000 }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [childrenWidths, setChildrenWidths] = useState([]);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [needsUpdate, setNeedsUpdate] = useState(false);
    const [scrolling, setScrolling] = useState(true)
    const [buttonDims, setButtonDims] = useState({});
    const ref = useRef();

    const {screen} = useContext(ScreenContext) || {};
    const isMobile = !screen.breakpoints?.includes('lg');

    useEffect(() => {
            const interval = setInterval(() => {
                // Check if dragging is in progress. If not, advance the carousel
                if (!isDragging && scrolling) {
                    advance();
                }
            }, scrollInterval); // milliseconds

            // Cleanup function to clear the interval when the component unmounts or state changes
            return () => {
                clearInterval(interval);
            };
    }, [scrollInterval, needsUpdate, childrenWidths, scrolling, scrollPosition]);
    const checkEdges = () => {
        const { scrollLeft, scrollWidth, clientWidth} = ref.current;
        // Check if the user has scrolled to (or very near) the right edge of the carousel
        const rightEdge = scrollWidth - clientWidth;
        const atRightEdge = (scrollLeft >= rightEdge - 1); // A small threshold to account for rounding errors
        const atLeftEdge = ( scrollLeft <= 1 );
        return {atRightEdge, atLeftEdge};
    };

    useEffect(() => {
        setTimeout(() => {
            const buttons = window.document.getElementsByClassName('mover');
            setButtonDims({height: buttons[0]?.getBoundingClientRect().height, width: buttons[0]?.getBoundingClientRect().width});
        }, 1000)
    }, []);

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
            setTimeout(() => {
                setIsDragging(false);
            }, 5000);
        }
    };

    const handleDrag = props => {
        const {afterScroll} = props;
        const scrollDirection = afterScroll < scrollLeft ? 'rewind' : 'advance';
        const {newScrollPosition, newTargetScroll} = checkPositionAndIncrement({scrollDirection, afterScroll});
        scroll({target: newTargetScroll});
        setScrollPosition (newScrollPosition);
    }
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
        newTargetScroll = childrenWidths[newScrollPosition];
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
            const {atRightEdge} = checkEdges();
            setIsDragging(false);
            const newPosition = (scrollPosition + 1 < childrenWidths.length) && !atRightEdge ? (scrollPosition + 1) : 0;
            const targetScrollLeft = childrenWidths[newPosition] - ref.current.offsetLeft; // Adjust if needed
            setScrollPosition(newPosition);
            scroll({target: targetScrollLeft});
    }
    const rewind = (event) => {
            event?.stopPropagation();
            const {atLeftEdge} = checkEdges();
            const { scrollLeft: beforeScroll } = ref.current;
            const newPosition = (scrollPosition - 1 >= 0) && !atLeftEdge ? scrollPosition - 1 : childrenWidths.length - 1;
            const targetScrollLeft = childrenWidths[newPosition] - ref.current.offsetLeft; // Adjust if needed
            scroll({target: targetScrollLeft});
            setTimeout(() => {
                const { scrollLeft: afterScroll } = ref.current;
                setNeedsUpdate( beforeScroll === afterScroll );
                setScrollPosition(newPosition);
            }, 50);
    }

    useEffect(() => {
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
    const handleTouchStart = props => {
        setScrolling(false);
    }
    const handleTouchEnd = props => {
        setTimeout(() => {
            setScrolling(true);
        }, 5000);
    }

    return (
        <>
            <div className={`overflow-hidden flex w-full ${fullWidth === 'noCrop' ? '' : `h-80`} ${className}`}>
                <div
                    ref={ref}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    onMouseEnter={handleEnter}
                    onMouseDown={startDragging}
                    onMouseLeave={handleExit}
                    onMouseUp={stopDragging}
                    onMouseMove={onDrag}
                    className={`*:snap-always *:snap-center snap-x snap-mandatory rounded-lg cursor-grab object-cover flex flex-row overflow-x-scroll no-scrollbar ${isDragging ? 'cursor-grabbing' : ''}`}
                >
                    {children}
                </div>
            </div>
            {
            !isMobile &&
            <>
            <div className="absolute left-full bottom-1/2">
                <Buttons.StandardButton style={{top: buttonDims.height ? (buttonDims.height / 2) : '', marginLeft: buttonDims.width ? -(buttonDims.width/2) : ''}} className={`mover bg-accent relative`} callback={advance}>
                    <TbSpeedboat className={`text-accent-content`} size={30} />
                </Buttons.StandardButton>
            </div>
            <div className="absolute right-full bottom-1/2">
                <Buttons.StandardButton style={{top: buttonDims.height ? (buttonDims.height / 2) : '', marginRight: buttonDims.width ? -(buttonDims.width/2) : ''}} className={`mover bg-accent relative`} callback={rewind}>
                    <TbSpeedboat className={`text-accent-content transform -scale-x-100`} size={30} />
                </Buttons.StandardButton>
            </div>
            </>
            }
        </>
    );
};

export default Carousel;
