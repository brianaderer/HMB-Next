import React, {useEffect, useRef, useState} from "react";
import marker from "./marker";
import Category from './Category';
import PlaceInfo from "./PlaceInfo";
import {isArray} from "@apollo/client/utilities";

const MapComponent = ({ center, zoom, locationData }) => {
    const ref = useRef();
    const [map, setMap] = useState(null);
    const [categories, setCategories] = useState([]);
    const [activeMarker, setActiveMarker] = useState({
        title: null,
        address: null,
        description: null,
        tags: [],
        categories: [],
        website: null,
        telephone: null,
    });
    const [activeCategories, setActiveCategories] = useState([]);

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
                createElement({index: 'home', AdvancedMarkerElement, title: 'Half Moon Bay Marina', position: center});

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
                        createElement({index, markerInstance, AdvancedMarkerElement, title: title, position: position, category: categoryList});
                    }

                } );
                setCategories(categorySet);
                setActiveCategories(categorySet);
            });
        }
    }, [map]); // Depend on map and center to add markers


    function createElement({markerInstance, index ,AdvancedMarkerElement, title, position}) {
        const marker = new AdvancedMarkerElement({
                        position: position,
                        map,
                        title: title,
                        collisionBehavior: 'REQUIRED_AND_HIDES_OPTIONAL',
                        //content: markerInstance,
                    });
                    // Add a click listener for each marker, and set up the info window.
                    marker.addListener("click", ({ domEvent }) => {
                        showInfo({index});
                    });
        if(locationData[index]){
            locationData[index].marker=marker;
        }
    }
    function showInfo({index}){
        const location = locationData[index];
        if( location ){
            let tags = [];
            if( 'tag' in location && isArray( location.tags ) ) {
                tags = location.tags.map( tag => tag.name );
            }
            //const tags = location.tags?.map(tag => tag.name) || [];
            const setData = {
                title: location.title,
                address: location.location.address,
                description: location.description,
                tags: tags,
                categories: location.category,
                website: location.website,
                telephone: location.telephone,
            }
            setActiveMarker(setData);
        }
    }
    async function newMarker(center){
        const { AdvancedMarkerElement } = await window.google.maps.importLibrary("marker");
        return AdvancedMarkerElement;
    }

    const handler = async props =>{
        const {category, bool} = props;
        let newCategories;
        if( !bool ){
            newCategories = (activeCategories.filter((activeCat) => activeCat !== category ));
        } else if( bool ){
            newCategories = [...activeCategories, category];
        }
        setActiveCategories( newCategories );
    }

    useEffect(() => {
        locationData.map((location, index) => {
            const categoryList = location.category;
            let bool = false;
            categoryList.map(category => {
                if( activeCategories.includes(category) ){
                    bool=true;
                }
            })
            if( bool && location.marker ){
                location.marker.map=map;
            } else if ( !bool && location.marker ){
                location.marker.map=null;
            }
        })
    }, [activeCategories]);


    return (
    <>
        <div className={`h-[600px] w-full`} ref={ref} id="map" />
        <PlaceInfo {...activeMarker} />
        <form>
            <fieldset>
                    {categories.map( (finalCat, index) => {
                        return(
                            <Category key={index} handler={handler}>{finalCat}</Category>
                            )
                        })
                    }
            </fieldset>
        </form>
    </>
    );
}
export default MapComponent;