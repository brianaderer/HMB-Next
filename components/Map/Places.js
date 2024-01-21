import {PlaceCard} from '../PlaceCard';

const Places = props => {
    const {callback, places, activeMarker, locationData, destroy} = props;
    const iteratedPlaces = [];
    const array = Object.keys(places);
    return(
        <div className="p-2 lg:p-10 h-auto overflow-auto">
            {array?.map((place, index) => {
                const id = places[index];
                const placeData = locationData[id];
                const catSlug = placeData.category_tax[0].slug;
                const firstPlace = !iteratedPlaces.includes(catSlug);
                if(!iteratedPlaces.includes(catSlug)){
                    iteratedPlaces.push(catSlug);
                }
                if (placeData.title) {
                    return (
                        <PlaceCard catSlug={catSlug} firstPlace={firstPlace} destroy={destroy} id={id} activeMarker={activeMarker} data={placeData} key={id} title={placeData.title} onClick={e => callback({index: id, domEvent: e})} />
                    );
                }
                return null;
            })}
        </div>

    )
}
export default Places;