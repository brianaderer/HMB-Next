import React, {useEffect, useRef, useState} from "react";
import marker from "./marker";
import Category from './Category';

const MapComponent = ({ center, zoom, locationData }) => {
    const ref = useRef();
    const [map, setMap] = useState(null);
    const [categories, setCategories] = useState([]);
    const [activeLocations, setActiveLocations] = useState([]);
    const [activeCategories, setActiveCategories] = useState([]);

    const mapOptions = {
        center: center,
        zoom: zoom,
        mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID,
    }

    useEffect(() => {
        setMap( new window.google.maps.Map( ref.current, mapOptions ) );
    }, [locationData]);

    async function init(){
        new window.google.maps.Map( ref.current, mapOptions ).then(map => {

        })
    }

    useEffect(() => {
        const markerInstance = marker({document});
        if (map) {
            newMarker().then(AdvancedMarkerElement => {
                createElement({markerInstance, AdvancedMarkerElement,  title: 'Half Moon Bay Marina', position: center});
                let categorySet = [];
                locationData.map((location, index) => {
                    const place =  location.location;
                    const position = {'lat': place?.lat, 'lng': place?.lng};
                    const title = location.title;
                    const categoryList = location.category;
                    categoryList.map( category => {
                        if(!(categorySet.includes(category))){
                                categorySet.push(category);
                            }
                        }
                    )
                    if(position.lat){
                        createElement({markerInstance, AdvancedMarkerElement, title: title, position: position, category: categoryList});
                    }

                } );
                setCategories(categorySet);
                setActiveCategories(categorySet);
            });
        }
    }, [map, locationData]); // Depend on map and center to add markers

    useEffect(() => {
    }, [categories]);

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

    const handler = props =>{
        console.log(props.target.checked);
    }

    return (
    <>
        <div className={`h-[600px] w-full`} ref={ref} id="map" />
        <form>
            <fieldset>
        {categories.map( (finalCat, index) => {
            return(
                <Category key={index} handler={handler}>{finalCat}</Category>
            )
        } )}
            </fieldset>
        </form>
    </>
    );
}
export default MapComponent;