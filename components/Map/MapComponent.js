import React, {useEffect, useRef, useState} from "react";
import marker from "./marker";
import Category from './Category';
import {isArray} from "@apollo/client/utilities";
import Places from "./Places";
import {parseSvg, categoryLookup} from "../../utilities";
import {StickyPortal, Button} from "../../components";

const MapComponent = ({ center, zoom, locations, classes }) => {
    const ref = useRef();
    const [map, setMap] = useState(null);
    const [categories, setCategories] = useState([]);
    const [activeMarker, setActiveMarker] = useState({});
    const [lastActiveMarker, setLastActiveMarker] = useState({});
    const [activeCategories, setActiveCategories] = useState([]);
    const [activePlaces, setActivePlaces] = useState([]);
    const [sortedActivePlaces, setSortedActivePlaces] = useState([]);
    const activePlacesRef = useRef(activePlaces);
    const [clickedOnMap, setClickedOnMap] = useState(false);
    const clickedOnMapRef = useRef(clickedOnMap);
    let locationData = [];
    if( locations.length > 0 ) {
        locations.sort((a, b) => {
            // Safely accessing the slug, default to empty string if not available
            const slugA = a.category_tax?.[0]?.slug || '';
            const slugB = b.category_tax?.[0]?.slug || '';

            return slugA.localeCompare(slugB);
        });
        //Map sorted locations to locationData
        locations.forEach((location, index) => {
            location.sortOrder=index;
            if (location.location?.place_id) {
                location.index = location.location.place_id;
                locationData[location.location.place_id] = location;
            } else {
                location.index = index;
                locationData[index] = location;
            }
        });
    }


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

    }, [locations]);

    useEffect(() => {
        if(map){
            map.addListener('click', () => {
                destroyMarker({clickedOnMap: true});
            });
        }
    }, [map]);

    const destroyMarker = props => {
        const {clickedOnMap} = props;
        setClickedOnMap(clickedOnMap);
        setActiveMarker({});
    }

    useEffect(() => {
        clickedOnMapRef.current = clickedOnMap;
    }, [clickedOnMap]);

    useEffect(() => {
        const markerInstance = marker({document});
        if (map) {
            newMarker().then(({AdvancedMarkerElement,PinElement}) => {
                createElement({index: 'home', AdvancedMarkerElement, PinElement ,title: 'Half Moon Bay Marina', position: center, category: 'home'});
                let categoriesTaxList = [];
                Object.keys(locationData).map((locationKey) => {
                    if( locationKey && locationData[locationKey] ){
                        const location = locationData[locationKey];
                        const place = location.location;
                        const position = {'lat': place?.lat, 'lng': place?.lng};
                        const title = location.title;
                        location.category_tax?.map(category => {
                            if (!categoriesTaxList.hasOwnProperty(category.term_id)) {
                                categoriesTaxList[category.term_id] = {'slug': category.slug, 'name': category.name};
                            }
                        });
                        if (position.lat) {
                            createElement({
                                index: locationKey,
                                markerInstance,
                                PinElement,
                                AdvancedMarkerElement,
                                title: title,
                                position: position,
                                category: location.category_tax[0]
                            });
                        }
                    }
                } );
                setCategories(categoriesTaxList);
                let newCategories = [];
                setActiveCategories(newCategories);
            });
        }
    }, [map]);

    useEffect(() => {
        const completeActivePlaces = activePlaces.map( id => locationData[id]);
        completeActivePlaces.sort((a,b) => {
            const orderA = a?.sortOrder || 0;
            const orderB = b?.sortOrder || 0;
            return orderA - orderB;
        });
        const newActivePlaces = completeActivePlaces.map( place => place.index );
        if( Object.keys(activeMarker).length === 0 ) {
            setSortedActivePlaces(newActivePlaces);
        } else {
            const activePlace = newActivePlaces.find(place => {
                return place === activeMarker.id;
            });
            // Filter out the activeMarker from activePlaces
            const filteredPlaces = newActivePlaces.filter(place => place !== activeMarker.id);

            // Place activeMarker as the first element, followed by the rest of the places
            const newSortedActivePlaces = activePlace ? [activePlace, ...filteredPlaces] : [...filteredPlaces];
            setSortedActivePlaces(newSortedActivePlaces);
         }
    }, [activePlaces, activeMarker]);

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
                        const clickedMarkerIndex = index; // Retrieve the index here
                        showInfo({index, domEvent})
                    });
        marker.content.classList.add('transition-all','origin-bottom');
        if(locationData[index]){
            locationData[index].marker=marker;
        }
    }

    useEffect(() => {
        if(activeMarker.index){
            setLastActiveMarker(activeMarker);
        }
    }, [activeMarker]);
    function showInfo({index, domEvent}){
        const {target} = domEvent;
        const isMapClick = target.closest('#map') != null;
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
                index: index,
                id: location.location.place_id,
            }
            setClickedOnMap(isMapClick);
            setActiveMarker(setData);
        }
    }

    useEffect(() => {
        if (activeMarker.index) {
            // Delay the scroll to allow for the DOM to update
            setTimeout(() => {
                scrollToElement(`${activeMarker.index}`, 'end');
                // After scrolling, then set the focus
                setFocusToElement(`${activeMarker.index}`);
            }, 0);
        } else if(lastActiveMarker.id && !clickedOnMapRef.current) {
            // Delay the scroll to allow for the DOM to update
            setTimeout(() => {
                scrollToElement(`${lastActiveMarker.index}`, 'start');
                // After scrolling, then set the focus
                setFocusToElement(`${lastActiveMarker.index}`);
                setLastActiveMarker({});
            }, 0);
        }
        else {
            setLastActiveMarker({});
        }
    }, [activeMarker]);

    function setFocusToElement(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.focus({ preventScroll: true });
        }
    }

    function scrollToElement(elementId, target) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: target, inline: 'nearest' });
        }
    }

    useEffect(() => {
        activePlacesRef.current.map( (id) => {
            const location = locationData[id];
            if( id !== activeMarker.index ){
                location?.marker?.content?.classList.remove('scale-150', 'drop-shadow-xl');
                if( location.marker ){
                    //location.marker.borderColor =
                    location.marker.zIndex = 1;
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
        const newPlaces = Object.keys(locationData).filter((key) => {
            const location = locationData[key];
            const hasActiveCategory = location.category_tax?.some(category => {
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
        if( newPlaces?.find( element => element === activeMarker.index) === undefined ){
            setActiveMarker({});
            setLastActiveMarker({});
        }
    }, [activeCategories, locations, map]); // Ensure to include all dependencies

    return (
        <>
            {categories.length > 0 &&
                <>
                    <div id={`mapSticky`}></div>
                    <StickyPortal targetId={`mapSticky`} stuckOnInit={true}>
                        <form className={`group-[.collapsed]:hidden stickyElement w-full p-2 flex flex-col items-center basis-full bg-neutral rounded-lg drop-shadow-lg mb-4 group-[.stickyContainer]:mb-0`}>
                            <p className={`p-2 text-center text-neutral-content`}>Click a category to Jump. Check the Box to show its contents.</p>
                            <fieldset className={`w-full flex flex-col group-[.stickyContainer]:flex-row group-[.stickyContainer]:gap-2 mb-2 group-[.stickyContainer]:justify-center flex-wrap`}>
                                {categories.map((cat, index) => {
                                    return (
                                        <Category isChecked={activeCategories.includes(index)} key={index} handler={handler}
                                                  category={cat} index={index}/>
                                    )
                                })
                                }
                            </fieldset>
                            <Button.LinkButton url={`#map`} className={`btn-wide group-[.stickyContainer]:btn-sm m-auto`}>Jump to Map</Button.LinkButton>
                        </form>
                    </StickyPortal>
                </>
        }
        <div id={`mapDiv`} className={`relative + ${classes}`}>
            <div className={`w-full rounded drop-shadow-lg flex flex-col`}>
                    <div className="flex flex-row h-64 lg:h-[500px]">
                        <div className={`h-full rounded w-auto min-w-1/2 flex-grow ml-1`} ref={ref} id="map" />
                    </div>
                {categories.length > 0 && <>
                    <Places destroy={destroyMarker} locationData={locationData} callback={showInfo} activeMarker={activeMarker}
                                                        places={sortedActivePlaces}/>
                    </>
            }
                </div>

        </div>
    </>
    );
}
export default MapComponent;