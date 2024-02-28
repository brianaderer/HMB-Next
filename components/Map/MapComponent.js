import React, {useEffect, useRef, forwardRef, useImperativeHandle, useState, useContext} from "react";
import marker from "./marker";
import Category from './Category';
import {isArray} from "@apollo/client/utilities";
import Places from "./Places";
import {parseSvg, categoryLookup, scrollIntoViewWithOffset} from "../../utilities";
import {StickyPortal, Button} from "../../components";
import {ScreenContext} from "../../contexts";
import {CATEGORIES} from "../../constants/categories";
import {createRoot} from "react-dom/client";

const MapComponent = ({ center, zoom, locations, classes }) => {
    const {setStickyExpanded, stickyExpanded, stuck} = useContext(ScreenContext);
    const ref = useRef();
    const [map, setMap] = useState(null);
    const [categories, setCategories] = useState([]);
    const [activeMarker, setActiveMarker] = useState({});
    const [lastActiveMarker, setLastActiveMarker] = useState({});
    const [activeCategories, setActiveCategories] = useState([]);
    const [activePlaces, setActivePlaces] = useState([]);
    const [sortedActivePlaces, setSortedActivePlaces] = useState([]);
    const activePlacesRef = useRef(activePlaces);
    const markerRefs = useRef({});
    const [clickedOnMap, setClickedOnMap] = useState(false);
    const [lastMarker, setLastMarker] = useState(null);
    const clickedOnMapRef = useRef(clickedOnMap);
    const [lastPin, setLastPin] = useState(null);
    const [legacyMarker, setLegacyMarker] = useState({});
    const activeMarkerRef = useRef(null);
    const pinRefs = useRef({});
    const [distances, setDistances] = useState({});
    const [allDistancesLoaded, setAllDistancesLoaded] = useState(false);
    const [intersections, setIntersections] = useState(false);
    const distancesRef = useRef({});
    let locationData = [];
    const getDistance = async props => {
        return await fetch("/api/distanceAPICall", {
            method: "POST",
            body: JSON.stringify(props),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
    const getLocalDistance = async props => {
        return await fetch("/api/localDistance", {
            method: "POST",
            body: JSON.stringify(props),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    const setLocalDistance = async props => {
        return await fetch("/api/writeDistance", {
            method: "POST",
            body: JSON.stringify(props),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    useEffect(() => {
        // Define an async function inside the effect
        const fetchLocalDistance = async () => {
            try {
                const localDistances = await getLocalDistance(); // Adjust this call if it needs parameters
                return await localDistances.json(); // Assuming the response needs to be parsed as JSON
            } catch (error) {
                console.error("Failed to fetch local distances:", error);
            }
        };

        // Call the async function
        // fetchLocalDistance().then((data) => {
        //     const locationKeys = Object.keys(locationData);
        //     const fsDistances = data?.data;
        //     const fsKeys = Object.keys(fsDistances);
        //     const intersection = locationKeys.filter(x => !fsKeys.includes(x));
        //     setDistances( fsDistances );
        //     setIntersections( intersection );
        // });

        // Cleanup function
        return () => {
            // If there's anything to clean up, do it here
            // For example, canceling a fetch operation, removing listeners, etc.
        };
    }, [locations]); // Ensure dependencies are correctly listed

    useEffect(() => {
        if (intersections.length > 0) {
            // Use a temporary variable to accumulate distance data
            let tempDistances = {...distances};

            // Convert each intersection operation into a Promise
            const distancePromises = intersections.map(intersection => {
                const location = locationData[intersection];
                if (!location?.location) return Promise.resolve();

                const position = location.marker?.position;
                return getDistance({id: location.index, start: center, finish: position})
                    .then(response => response.json())
                    .then(data => {
                        // Directly update the temporary variable
                        tempDistances[intersection] = tempDistances[intersection] || {};
                        tempDistances[intersection]['driving'] = data.data;
                        // Conditionally trigger the second API call
                        if (data.data.distance?.value < 3300) {
                            return getDistance({id: location.index, start: center, finish: position, mode: 'walking'})
                                .then(response => response.json())
                                .then(walkingData => {
                                    tempDistances[intersection]['walking'] = walkingData.data;
                                });
                        }
                    });
            });

            // Wait for all distance calculations to complete
            Promise.all(distancePromises).then(() => {
                // Once all promises resolve, update the state once with the accumulated data
                setDistances(tempDistances);
                setLocalDistance({distances: tempDistances}).then(data => {
                });
                setAllDistancesLoaded(true);
            }).catch(error => console.error("Error fetching distances", error));
        }
        // Removed 'distances' from the dependency array to avoid re-triggering the effect due to state updates
    }, [intersections, center]);

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
            if (!pinRefs.current[location.index]) {
                pinRefs.current[location.index] = React.createRef();
            }
        });
    }

    const mapOptions = {
        center: center,
        zoom: zoom,
        mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID,
    }

    useEffect(() => {
        distancesRef.current = distances;
    }, [distances]);

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
                        if( location.category_tax.length > 0 ) {
                            location.category_tax?.map(category => {
                                if (!categoriesTaxList.hasOwnProperty(category.term_id)) {
                                    categoriesTaxList[category.term_id] = {
                                        'slug': category.slug,
                                        'name': category.name
                                    };
                                }
                            });
                        }
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
    }, [map, allDistancesLoaded]);

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

    const MapPin = forwardRef((props, ref) => {
        const {pinRef} = ref;
        const {bgColor, text, border, SVGString = null, textColor, id, distances} = props;
        const svgRef = useRef(null);
        const textRef = useRef(null);
        useImperativeHandle(pinRef, () => ({
            svg: svgRef.current,
            text: textRef.current
        }));
        return (
            <div className={`overflow-hidden showContent ${bgColor} ${border} p-2 border rounded-lg rounded-bl-none absolute bottom-0 left-[50%] transition-all`}>
                <div className={`pinContent marker-contents w-full flex flex-row gap-2 items-center justify-center`} >
                    <div ref={svgRef} id={`svg${id}`} dangerouslySetInnerHTML={{__html:SVGString}} className={`${textColor} transition-all w-4 h-4 flex items-center justify-center`}>
                    </div>
                    <div ref={textRef} id={`text${id}`} className={`hidden group-[.showContent]:visible ${textColor}`}>
                        {text}<br />
                        {distances[id] && distances[id].driving.distance.text}
                    </div>
                </div>
            </div>
        )
    })

    const returnPin = props => {
        const {category, title, id} = props;
        const parser = new DOMParser();
        const {pinData, slug} = categoryLookup({parser, category});
        const svg = parseSvg({parser, slug});
        const namedTag = document.createElement("div");
        const expanded = activeMarker.index === id;
        const mapPinProps = {
            bgColor: pinData.backgroundColor, // replace with actual values
            SVGString: svg, // replace with actual SVG component or element
            text: title, // replace with actual text
            border: pinData.borderGlyphColor,
            textColor: pinData.textColor,
            id: id,
            distances: distances,
        };
        const pinRef = pinRefs.current[id];
        const forwardRef = {pinRef, distances: distancesRef.current};
        const root = createRoot(namedTag);
        root.render(<MapPin ref={forwardRef} {...mapPinProps} />);

        return namedTag;
    }
    function createElement({markerInstance, index, AdvancedMarkerElement, PinElement, title, position, category}) {
        const pin = returnPin({category, title, id: index});
        const marker = new AdvancedMarkerElement({
                        position: position,
                        map,
                        title: title,
                        content: pin,
                        collisionBehavior: 'REQUIRED_AND_HIDES_OPTIONAL',
                        //content: markerInstance,
                    });
                    // Add a click listener for each marker, and set up the info window.
                    marker.addListener("click", ({ domEvent }) => {
                        const clickedMarkerIndex = index; // Retrieve the index here
                        showInfo({index, domEvent})
                    });
        marker.content.classList.add('transition-all','origin-bottom');
        markerRefs.current[index] = pin;
        if(locationData[index]){
            locationData[index].marker=marker;
        }
    }

    useEffect(() => {
        if(activeMarker.index){
            setLastActiveMarker(activeMarker);
        }
        activeMarkerRef.current = activeMarker;
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
        const headerHeight = document.getElementById('nav').getBoundingClientRect().height;
        const location = locationData[activeMarker.index]?.location;
        if (activeMarker.index && location) {
            scrollIntoViewWithOffset( {id: 'map', offset: headerHeight + 80 } );
            // After scrolling, then set the focus
            setFocusToElement(`${activeMarker.index}`);

        } else if(lastActiveMarker.id && !clickedOnMapRef.current) {
            setTimeout(() => {
                scrollIntoViewWithOffset({id:`${lastActiveMarker.index}`, offset: headerHeight + 80})
                // After scrolling, then set the focus
                setFocusToElement(`${lastActiveMarker.index}`);
                setLastActiveMarker({});
            }, 10)
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

    useEffect(() => {
        if( !activeMarker.index ){
            setLegacyMarker( lastActiveMarker );
        } else {
            setLegacyMarker({});
        }
    }, [activeMarker]);

    useEffect(() => {
            activePlacesRef.current.map( (id) => {
            const location = locationData[id];
            const text = pinRefs.current[id]?.current?.text;
            const svg = pinRefs.current[id]?.current?.svg;
            if (id === activeMarkerRef.current.id){
                location?.marker?.content?.classList.add('drop-shadow-md');
                svg?.classList.add('!w-6', '!h-6');
                text?.classList.remove('hidden');
                svg?.classList.add('mr-2');
                if( location.marker ){
                    const bounds = new window.google.maps.LatLngBounds();
                    const markerPos = location.marker.position;
                    bounds.extend(center);
                    bounds.extend(markerPos);
                    setLastPin(location.marker.content);
                    const catSlug = location.category_tax[0].slug;
                    const category = CATEGORIES[catSlug];
                    const placeData = location.location;
                    location.marker.zIndex = 100;
                    map.fitBounds(bounds);
                    const zoom = map.zoom;
                    map.setZoom(zoom -1);
                }
            }
            else if( id !== activeMarkerRef.current.id){
                location?.marker?.content?.classList.remove('drop-shadow-md');
                svg?.classList.remove('!w-6', '!h-6');
                text?.classList.add('hidden');
                svg?.classList.remove('mr-2');
                if( location.marker ){
                    location.marker.zIndex = 1;
                }
            }
        } )
    }, [activeMarkerRef.current, activePlacesRef.current, pinRefs.current]);
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
            let  hasActiveCategory = false;
            const location = locationData[key];
            if( location.category_tax?.length > 0 ){
                hasActiveCategory = location.category_tax?.some(category => {
                        return activeCategories.includes(category.term_id);
                    }
                );
            }
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

    const jumpToMap = props => {
        const headerHeight = document.getElementById('nav').getBoundingClientRect().height;
        scrollIntoViewWithOffset({id: 'map', offset: headerHeight + 80});
        if( stuck ){
            setStickyExpanded(false);
        }
    }

    return (
        <>
            {categories.length > 0 &&
                <>
                    <StickyPortal targetId={`mapSticky`}>
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
                            <Button.StandardButton callback={jumpToMap} className={`btn-wide group-[.stickyContainer]:btn-sm m-auto`}>Jump to Map</Button.StandardButton>
                        </form>
                    </StickyPortal>
                    <div id={`mapSticky`}></div>
                </>
        }
        <div id={`mapDiv`} className={`relative + ${classes}`}>
            <div className={`w-full rounded drop-shadow-lg flex flex-col`}>
                    <div className="flex flex-row h-96 lg:h-[500px]">
                        <div className={`h-full rounded w-auto min-w-1/2 flex-grow ml-1`} ref={ref} id="map" />
                    </div>
                {categories.length > 0 && <>
                    <Places destroy={destroyMarker} locationData={locationData} callback={showInfo} activeMarker={activeMarkerRef.current}
                                                        places={sortedActivePlaces} distances={distances}/>
                    </>
            }
                </div>

        </div>
    </>
    );
}
export default MapComponent;