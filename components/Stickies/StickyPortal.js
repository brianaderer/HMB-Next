import React, { useContext, useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { ScreenContext } from "../../contexts";
import { scroller } from "../../utilities/scroller";

const StickyElementPortal = ({ children, targetId }) => {
    const [container, setContainer] = useState(null);
    const [top, setTop] = useState(null);
    const [placeholderHeight, setPlaceholderHeight] = useState(0);
    const { screen, offScreen, setOffScreen } = useContext(ScreenContext);
    const [originalHeight, setOriginalHeight] = useState(0);
    const childrenRef = useRef();  // Reference to the children
    const originalRef = useRef(0);
    const isSticky = children.props.className?.includes("stickyElement");

    if(!isSticky){
        return children;
    }

    useEffect(() => {
        // Construct the selector
        const selector = `sticky-${targetId}-Container`; // e.g., 'myIdContainer'

        // Check and remove existing portal-container if it exists
        const existingContainer = document.querySelector(`.${selector}`);
        if (existingContainer) {
            existingContainer.parentNode.removeChild(existingContainer);
        }

        // Create a new div that will be the portal container
        const portalContainer = document.createElement('div');
        portalContainer.classList.add(selector);
        const stickyContainer = document.getElementById('stickies');
        stickyContainer.appendChild(portalContainer);
        setContainer(portalContainer);
    }, [targetId]);  // Added targetId as a dependency

    useEffect(() => {
        if(originalHeight === 0){
            setOriginalHeight( originalRef.current.getBoundingClientRect().height )
        }
    }, []);

    useEffect(() => {
        if( top !== null ) {
            const navHeight = screen.navHeight;
            const offscreen = -(top) > (navHeight - (originalHeight));
            setOffScreen(offscreen);
            setPlaceholderHeight(offscreen ? originalHeight : 0);
        }
    }, [top, screen.navHeight]);

    scroller({ target: targetId, setTop: setTop });
    useEffect(() => {
        const elem = document.getElementById(targetId);
        if (elem) {
            const injectHeight = placeholderHeight > 80 ? 80 : placeholderHeight;
            elem.style.height = `${injectHeight}px`;
        }
    }, [placeholderHeight, targetId]);

    return (
        <>
            {isSticky && (offScreen && container) ? ReactDOM.createPortal(
                <div ref={childrenRef}>{children}</div>, container
            ) : <div ref={originalRef}>{children}</div>}
        </>
    );
};

export default StickyElementPortal;
