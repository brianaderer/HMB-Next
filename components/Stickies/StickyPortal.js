import React, { useContext, useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { ScreenContext } from "../../contexts";
import { scroller } from "../../utilities/scroller";
import {useRouter} from "next/router";

const StickyElementPortal = ({ children, targetId, stuckOnInit = false }) => {
    const [container, setContainer] = useState(null);
    const [top, setTop] = useState(null);
    const [placeholderHeight, setPlaceholderHeight] = useState(0);
    const { screen, offScreen, setOffScreen, stuck, stickyExpanded, setStickyExpanded, stickyHeight, setStickyHeight } = useContext(ScreenContext);
    const [originalHeight, setOriginalHeight] = useState(0);
    const childrenRef = useRef();  // Reference to the children
    const originalRef = useRef(0);
    const isSticky = children.props.className?.includes("stickyElement");
    const router = useRouter();

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
    }, [targetId, router]);  // Added targetId as a dependency

    useEffect(() => {
        if(originalHeight === 0){
            setOriginalHeight( originalRef.current.getBoundingClientRect().height )
        }
    }, [router]);

    useEffect(() => {
        if( top !== null && !stuckOnInit ) {
            const navHeight = screen.navHeight;
            const offscreen = -(top) > ((navHeight - (originalHeight)) + ( originalHeight ));
            setOffScreen(offscreen);
            setPlaceholderHeight(offscreen ? originalHeight : 0);
        }
        if ( stuckOnInit ){
            setOffScreen( true );
        }
    }, [top, screen.navHeight, router]);

    scroller({ target: targetId, setTop: setTop });
    useEffect(() => {
        const elem = document.getElementById(targetId);
        if (elem  && !stuckOnInit) {
            elem.style.height = `${placeholderHeight}px`;
            // elem.style.paddingTop = `${placeholderHeight}px`;
            // elem.style.marginBottom= `${-placeholderHeight}px`;
        }
    }, [placeholderHeight, targetId]);
    useEffect(() => {
       if(offScreen && stickyExpanded){
           const height = document.getElementById('stickies').getBoundingClientRect().height;
           setStickyHeight(height);
       }
    }, [offScreen, stickyExpanded, router]);

    useEffect(() => {
        if( stuckOnInit ){
            const main = document.getElementById('main-container');
            //const padding = parseInt(main.style.paddingTop, 10) || 0;
            const height = document.getElementById('stickies').getBoundingClientRect().height;
            main.style.paddingTop = `${height}px`;
        }
    }, [offScreen, stuck, router]);

    return (
        <>
            {isSticky && (offScreen && container) ? ReactDOM.createPortal(
                <div ref={childrenRef}>{children}</div>, container
            ) : <div ref={originalRef}>{children}</div>}
        </>
    );
};

export default StickyElementPortal;
