import React, { useContext, useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import { ScreenContext } from "../../contexts";
import { scroller } from "../../utilities/scroller";

const StickyElementPortal = ({ children, targetId: id }) => {
    const [container, setContainer] = useState(null);
    const [top, setTop] = useState(0);
    const [placeholderHeight, setPlaceholderHeight] = useState(0);
    const { screen, offScreen, setOffScreen } = useContext(ScreenContext);

    // Callback ref to track when children are rendered
    const setChildrenRef = useCallback(node => {
        if (node !== null) {
            const childrenHeight = node.getBoundingClientRect().height;
            // Only set offScreen when children are rendered
            const offscreen = -(top) > screen.navHeight;
            setOffScreen(offscreen);
            if( offscreen ){
                setPlaceholderHeight(childrenHeight);
            } else {
                setPlaceholderHeight( 0 );
            }
        }
    }, [top, screen.navHeight, setOffScreen]);

    useEffect(() => {
        const selector = `sticky-${id}-container`;
        let portalContainer = document.querySelector('.' + selector);

        if (!portalContainer) {
            portalContainer = document.createElement('div');
            portalContainer.classList.add(selector);
            portalContainer.classList.add('w-full')
            portalContainer.classList.add('empty:hidden')
            const stickyContainer = document.getElementById('stickies');
            if (stickyContainer) {
                stickyContainer.appendChild(portalContainer);
            }
            setContainer(portalContainer);
        }
        // Cleanup function to remove the container when the component unmounts
        return () => {
            portalContainer.parentNode.removeChild(portalContainer);
        };
    }, [id]);

    const isSticky = children.props.className?.includes("stickyElement");
    scroller({ target: id, setTop: setTop });

    const placeholder = placeholderHeight > 0 ? (
        <div style={{ height: `${placeholderHeight}px` }}></div>
    ) : null;

    if (isSticky) {
        return (
            <>
                {offScreen && container ? ReactDOM.createPortal(
                    <div ref={setChildrenRef}>{children}</div>, container
                ) : <div ref={setChildrenRef}>{children}</div>}
                {placeholder}
            </>
        );
    } else {
        return <>{children}</>;
    }
};

export default StickyElementPortal;
