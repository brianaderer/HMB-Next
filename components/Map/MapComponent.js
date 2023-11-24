import React, {useEffect, useRef, useState} from "react";
import marker from "./marker";

const MapComponent = ({ center, zoom, locationData }) => {
    const ref = useRef();
    const [map, setMap] = useState(null);

    const mapOptions = {
        center: center,
        zoom: zoom,
        mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID,
    }

    useEffect(() => {
        setMap( new window.google.maps.Map( ref.current, mapOptions ) );
    }, [locationData]);


    useEffect(() => {
        const markerInstance = marker({document, title: 'Half Moon Bay Marina'});
        if (map) {
            newMarker().then(AdvancedMarkerElement => {
                createElement({markerInstance, AdvancedMarkerElement});
            });
        }
    }, [map, locationData]); // Depend on map and center to add markers

    function createElement({markerInstance, AdvancedMarkerElement}) {
        new AdvancedMarkerElement({
            position: center,
            map,
            title: 'Half Moon Bay Marina',
            content: markerInstance,
        });
    }
    async function newMarker(center){
        const { AdvancedMarkerElement } = await window.google.maps.importLibrary("marker");
        return AdvancedMarkerElement;
    }


    return (
    <>
        <div className={`h-[600px] w-full`} ref={ref} id="map" />
        {/*{map && locationData.map( (location, index) => {*/}
        {/*    return(*/}
        {/*        <Marker key={index} map={map} location={location}>*/}
        {/*            <div>*/}
        {/*                <h2>*/}
        {/*                    {location.title}*/}
        {/*                </h2>*/}
        {/*            </div>*/}
        {/*        </Marker>*/}
        {/*    )*/}
        {/*} )}*/}
    </>
    );
}
export default MapComponent;