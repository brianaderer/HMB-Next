import React, { useEffect, useRef } from "react";

const MapComponent = ({ center, zoom }) => {
    const ref = useRef();

    useEffect(() => {
        new window.google.maps.Map(ref.current, {
            center,
            zoom,
        });
    });

    return <div className={`h-[600px] w-full`} ref={ref} id="map" />;
}
export default MapComponent;