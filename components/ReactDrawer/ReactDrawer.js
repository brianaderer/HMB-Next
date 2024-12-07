import React, {useEffect, useState} from 'react';
import { Button } from '../../components';

// import component 👇
import Drawer from 'react-modern-drawer'

//import styles 👇
import 'react-modern-drawer/dist/index.css'

const ReactDrawer = props => {
    const { expanded, buttonStyle ,children, top = false, offScreen = false, setStickyExpanded, className } = props;
    const [isOpen, setIsOpen] = React.useState(false);
    const [firstOpen, setFirstOpen] = useState(true);
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    useEffect(() => {
        setTimeout(() => {
            setStickyExpanded(isOpen);
        }, 150);
    }, [isOpen]);

    useEffect(() => {
        if( !offScreen ){
            setIsOpen( false );
        }
        if( offScreen && firstOpen ){
            setIsOpen(true);
            setFirstOpen(false);
        }
    }, [offScreen]);

    useEffect(() => {
        if( !expanded ){
            setIsOpen(false);
        }
    }, [expanded]);

    return (
        <div className={`${className}`}>
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='right'
                className='!bg-transparent !border-l-0 !shadow-transparent !shadow-none'
            >
                {children}
                <Button.VTab expanded={isOpen} style={ buttonStyle } className={`py-0 absolute h-full right-full top-0 ${offScreen ? `!visible` : `!hidden` }`} callback={toggleDrawer}></Button.VTab>
            </Drawer>
        </div>
    )
}

export default ReactDrawer;