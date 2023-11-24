import React, {useEffect, useRef, useState} from "react";
import Marker from "./Marker";

const MapComponent = ({ center, zoom, locationData }) => {
    const ref = useRef();
    const [map, setMap] = useState();

    useEffect(() => {
        setMap( new window.google.maps.Map( ref.current, { center, zoom,} ) )
    }, [locationData]);

    return (
    <>
        <div className={`h-[600px] w-full`} ref={ref} id="map" />
        {map && locationData.map( (location, index) => {
            return(
                <Marker key={index} map={map} location={location} />
            )
        } )}
    </>
    );
}
export default MapComponent;