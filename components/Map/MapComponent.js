import React, {useEffect, useRef, useState} from "react";
import Marker from "./Marker";

const MapComponent = ({ center, zoom }) => {
    const ref = useRef();
    const [map, setMap] = useState();

    useEffect(() => {
        setMap( new window.google.maps.Map( ref.current, { center, zoom,} ) )
    }, []);

    return (
    <>
        <div className={`h-[600px] w-full`} ref={ref} id="map" />
        {map && <Marker map={map} />}
    </>
    );
}
export default MapComponent;