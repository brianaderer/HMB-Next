import {useRef } from "react";
import {stickyFX} from "../../utilities/sticky";

const MapSticky = props => {
    const { children, target, classes = '' } = props;
    const stickyRef = useRef(null);
    stickyFX({stickyRef, target});

    return(
        <>
            <div id={`Sticky`} ref={stickyRef} className={`${classes} transition-all`}>
                {children}
            </div>
        </>
    )
}
export default MapSticky;
