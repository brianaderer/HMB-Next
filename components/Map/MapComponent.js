import React, {useEffect, useRef, useState} from "react";
import marker from "./marker";
import Category from './Category';
import PlaceInfo from "./PlaceInfo";
import {isArray} from "@apollo/client/utilities";
import Places from "./Places";
import {parseSvg, categoryLookup} from "../../utilities";

const MapComponent = ({ center, zoom, locationData }) => {
    const ref = useRef();
    const [map, setMap] = useState(null);
    const [categories, setCategories] = useState([]);
    const [activeMarker, setActiveMarker] = useState({});
    const [activeCategories, setActiveCategories] = useState([]);
    const [activePlaces, setActivePlaces] = useState([]);
    const activePlacesRef = useRef(activePlaces);


    const mapOptions = {
        center: center,
        zoom: zoom,
        mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID,
    }

    useEffect(() => {
        activePlacesRef.current = activePlaces;
    }, [activePlaces]);

    useEffect(() => {
        setMap( new window.google.maps.Map( ref.current, mapOptions ) );
    }, [locationData]);

    useEffect(() => {
        if(map){
            map.addListener('click', () => {
               setActiveMarker({});
            });
        }
    }, [map]);

    useEffect(() => {
        const markerInstance = marker({document});
        if (map) {
            newMarker().then(({AdvancedMarkerElement,PinElement}) => {
                createElement({index: 'home', AdvancedMarkerElement, PinElement ,title: 'Half Moon Bay Marina', position: center, category: 'home'});
                let categoriesTaxList = [];
                locationData.map((location, index) => {
                    const place =  location.location;
                    const position = {'lat': place?.lat, 'lng': place?.lng};
                    const title = location.title;
                    location.category_tax.map(category => {
                        if( !categoriesTaxList.hasOwnProperty(category.term_id)){
                            categoriesTaxList[category.term_id] = {'slug': category.slug, 'name': category.name };
                        }
                    });
                    if(position.lat){
                        createElement({index, markerInstance, PinElement ,AdvancedMarkerElement, title: title, position: position, category: location.category_tax[0]});
                    }

                } );
                setCategories(categoriesTaxList);
                let newCategories = [];
                // for (let category in categoriesTaxList){
                //     newCategories.push(Number(category));
                // }
                setActiveCategories(newCategories);
            });
        }
    }, [map]);


    function createElement({markerInstance, index ,AdvancedMarkerElement, PinElement, title, position, category}) {
        const parser = new DOMParser();
        const {pinData, slug} = categoryLookup({parser, category});
        const pinSvg = parseSvg({parser, slug});
        const glyphSvgPinElement = new PinElement({
            glyph: pinSvg,
            glyphColor: pinData?.glyphColor,
            background: pinData?.background,
            borderColor: pinData?.borderColor,
            scale: 1.2,
        });
        const marker = new AdvancedMarkerElement({
                        position: position,
                        map,
                        title: title,
                        content: glyphSvgPinElement.element,
                        collisionBehavior: 'REQUIRED_AND_HIDES_OPTIONAL',
                        //content: markerInstance,
                    });
                    // Add a click listener for each marker, and set up the info window.
                    marker.addListener("click", ({ domEvent }) => {
                        for ( let place in activePlacesRef.current ) {
                            if(locationData[index] && activePlacesRef.current[place].location.place_id === locationData[index].location.place_id){
                                showInfo({index: Number(place), domEvent});
                                break;
                            }
                        }
                    });
        marker.content.classList.add('transition-all','origin-bottom');
        if(locationData[index]){
            locationData[index].marker=marker;
        }
    }
    function showInfo({index, domEvent}){
        const {target} = domEvent;
        const location = activePlacesRef.current[index];
        if( location ){
            let tags = [];
            if( isArray( location.tags ) ) {
                tags = location.tags.map( tag => tag.name );
            }
            const setData = {
                title: location.title,
                address: location.location.address,
                description: location.description,
                tags: tags,
                categories: location.category_tax,
                website: location.website,
                telephone: location.telephone,
                index: index,
            }
            setActiveMarker(setData);
        }
    }

    useEffect(() => {
        activePlaces.map( (location, index) => {
            if( index !== activeMarker.index ){
                location?.marker?.content?.classList.remove('scale-150', 'drop-shadow-xl');
                if( location.marker ){
                    location.marker.borderColor =
                    location.marker.zIndex = index;
                }
            } else {
                location?.marker?.content?.classList.add('scale-150', 'drop-shadow-xl');
                if( location.marker ){
                    const placeData = location.location;
                    location.marker.zIndex = 100;
                    if( map.getZoom() < placeData.zoom ){
                        map.setZoom(placeData.zoom);
                    }
                    map.panTo({lat: placeData.lat, lng: placeData.lng});
                }
            }
        } )
    }, [activeMarker]);
    async function newMarker(center){
        const { AdvancedMarkerElement, PinElement } = await window.google.maps.importLibrary("marker");
        return {AdvancedMarkerElement, PinElement};
    }

    const handler = async ({ category, bool }) => {
        let newCategories = [];
        if( bool ){
            newCategories=[...activeCategories];
            newCategories.push(category);
        } else {
            newCategories = activeCategories.filter(listCategory => {
                    return Number(listCategory) !== category;
                }
            )
        }
        setActiveCategories(newCategories);
    };


    useEffect(() => {
        const newPlaces = locationData.filter((location) => {
            const hasActiveCategory = location.category_tax.some(category => {
                    return activeCategories.includes(category.term_id);
                }
            );
            // Set marker map based on category match
            if (location.marker) {
                location.marker.map = hasActiveCategory ? map : null;
            }

            return hasActiveCategory;
        });

        setActivePlaces(newPlaces);
    }, [activeCategories, locationData, map]); // Ensure to include all dependencies
    let expand = Object.keys(activeMarker).length;

    return (
    <>
        <div className={`w-full rounded drop-shadow-lg flex flex-col`}>
                <div className="flex flex-row h-[500px]">
                    <div className={`h-full rounded w-auto min-w-1/2 flex-grow ml-1`} ref={ref} id="map" />
                </div>
            <form>
                <fieldset className={`px-4 flex flex-row items-justified-space-between mt-4`}>
                    {categories.map( (cat, index) => {
                        return(
                            <Category isChecked={activeCategories.includes(index)} key={index} handler={handler} category={cat} index={index} />
                        )
                    })
                    }
                </fieldset>
            </form>
            <Places callback={showInfo} {...activePlaces} />
            </div>
    </>
    );
}
export default MapComponent;