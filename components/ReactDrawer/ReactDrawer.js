import React, {useEffect, useState} from 'react';
import { Button } from '../../components';

// import component 👇
import Drawer from 'react-modern-drawer'

//import styles 👇
import 'react-modern-drawer/dist/index.css'

const ReactDrawer = props => {
    const { expanded, buttonStyle ,children, top = false, offScreen = false, setStickyExpanded } = props;
    const [isOpen, setIsOpen] = React.useState(false);
    const [firstOpen, setFirstOpen] = useState(true);
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    useEffect(() => {
       setStickyExpanded(isOpen);
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
        <div className={``}>
            {/*<Button.VTab className={`${stickyExpanded ? `` : ''} absolute right-full z-50 bottom-1/2`} callback={toggleExpanded} expanded={stickyExpanded}></Button.VTab>*/}
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='right'
                className='!bg-transparent'
            >
                {children}
                <Button.VTab expanded={isOpen} style={ buttonStyle } className={`py-0 border-r-0 absolute right-full top-0 ${offScreen ? `!visible` : `!hidden` }`} callback={toggleDrawer}></Button.VTab>
            </Drawer>
        </div>
    )
}

export default ReactDrawer;