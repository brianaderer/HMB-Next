import React, { useEffect, useState, useRef } from 'react';
import { Button } from '../../components';

// import component 👇
import Drawer from 'react-modern-drawer';

//import styles 👇
import 'react-modern-drawer/dist/index.css';

const ReactDrawer = (props) => {
    const { expanded, buttonStyle, children, top = false, offScreen = false, setStickyExpanded, className } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [firstOpen, setFirstOpen] = useState(true);
    const [childHeight, setChildHeight] = useState(0);
    const childRef = useRef(null);

    const toggleDrawer = () => {
        setTimeout(() => {
            setIsOpen((prevState) => !prevState);
        }, 300);
    };

    const updateChildHeight = () => {
        if (childRef.current) {
            setChildHeight(childRef.current.offsetHeight);
        }
    };

    useEffect(() => {
        setStickyExpanded(isOpen);
    }, [isOpen]);

    useEffect(() => {
        if (!offScreen) {
            setIsOpen(false);
        }
        if (offScreen && firstOpen) {
            setFirstOpen(false);
            setTimeout(() => {
                setIsOpen(true);
            }, 300);
        }
    }, [offScreen]);


    return (
        <div className={`${className}`}>
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction="right"
                className="!bg-transparent !border-l-0 !shadow-transparent !shadow-none"
            >
                <div ref={childRef}>
                    {children}
                </div>
                <Button.VTab
                    expanded={isOpen}
                    style={buttonStyle}
                    className={`py-0 absolute right-full top-0 ${offScreen ? `!visible` : `!hidden`}`}
                    height={childHeight}
                    callback={toggleDrawer}
                ></Button.VTab>
            </Drawer>
        </div>
    );
};

export default ReactDrawer;
