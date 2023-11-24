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
        const markerInstance = marker({document});
        if (map) {
            newMarker().then(AdvancedMarkerElement => {
                createElement({markerInstance, AdvancedMarkerElement,  title: 'Half Moon Bay Marina', position: center});
                locationData.map((location, index) => {
                    const place =  location.location;
                    const position = {'lat': place?.lat, 'lng': place?.lng};
                    if(position.lat){
                        const title = location.title;
                        const category = location.category;
                        createElement({markerInstance, AdvancedMarkerElement, title: title, position: position, category: category});
                    }

                } );
            });
        }
    }, [map, locationData]); // Depend on map and center to add markers

    function createElement({markerInstance, AdvancedMarkerElement, title, position}) {
        const marker = new AdvancedMarkerElement({
                        position: position,
                        map,
                        title: title,
                        collisionBehavior: 'REQUIRED_AND_HIDES_OPTIONAL',
            //content: markerInstance,
        });
        // Add a click listener for each marker, and set up the info window.
        marker.addListener("click", ({ domEvent }) => {
            const { target } = domEvent;
            console.log(marker.title);
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