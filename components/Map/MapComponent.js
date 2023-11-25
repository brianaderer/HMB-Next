import React, {useEffect, useRef, useState} from "react";
import marker from "./marker";
import Category from './Category';
import PlaceInfo from "./PlaceInfo";
import {isArray} from "@apollo/client/utilities";
import Places from "./Places";
import * as svg from '../../svg';
import {parseSvg} from "../../utilities";

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
        category_tax: [],
        website: null,
        telephone: null,
    });
    const [activeCategories, setActiveCategories] = useState([]);
    const [activePlaces, setActivePlaces] = useState([]);

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
            newMarker().then(({AdvancedMarkerElement,PinElement}) => {
                createElement({index: 'home', AdvancedMarkerElement, PinElement ,title: 'Half Moon Bay Marina', position: center});
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
                        createElement({index, markerInstance, PinElement ,AdvancedMarkerElement, title: title, position: position});
                    }

                } );
                setCategories(categoriesTaxList);
                setActiveCategories(categoriesTaxList);
            });
        }
    }, [map]);


    function createElement({markerInstance, index ,AdvancedMarkerElement, PinElement, title, position}) {
        const parser = new DOMParser();
        const pinSvg = parseSvg({parser});
        const glyphSvgPinElement = new PinElement({
            glyph: pinSvg,
            glyphColor: "#ff8300",
            background: "#FFD514",
            borderColor: "#ff8300",
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
                        showInfo({index, domEvent});
                    });
        if(locationData[index]){
            locationData[index].marker=marker;
        }
    }
    function showInfo({index, domEvent}){
        const {target} = domEvent;
        console.log(target);
        const location = locationData[index];
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
            }
            setActiveMarker(setData);
        }
    }
    async function newMarker(center){
        const { AdvancedMarkerElement, PinElement } = await window.google.maps.importLibrary("marker");
        return {AdvancedMarkerElement, PinElement};
    }

    const handler = async props =>{
        const {category, bool} = props;
        let newCategories= [];
        if( !bool ){
            activeCategories.map((active, key) => {
                if(key !== category){
                    newCategories[key] = active;
                }
            })
        } else if( bool ){
            newCategories = [...activeCategories];
            newCategories[category] = categories[category];
        }
        setActiveCategories( newCategories );
    }

    useEffect(() => {
        let newPlaces = [];
        locationData.map((location, index) => {
            const categoryList = location.category_tax;
            let bool = false;
            categoryList.map(category => {
                if( activeCategories.hasOwnProperty(category.term_id) ){
                    newPlaces.push(location);
                    bool=true;
                }
            })
            if( bool && location.marker ){
                location.marker.map=map;
            } else if ( !bool && location.marker ){
                location.marker.map=null;
            }
        });
        setActivePlaces(newPlaces);
    }, [activeCategories]);


    return (
    <>
        <div className={`h-[600px] w-full`} ref={ref} id="map" />
        <PlaceInfo {...activeMarker} />
        <Places {...activePlaces} />
        <form>
            <fieldset>
                    {categories.map( (cat, index) => {
                        return(
                            <Category key={index} handler={handler} category={cat} index={index} />
                            )
                        })
                    }
            </fieldset>
        </form>
    </>
    );
}
export default MapComponent;