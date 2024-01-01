import {PlaceCard} from '../PlaceCard';
const Places = props => {
    const {callback, places, activeMarker, locationData, destroy} = props;
    const array = Object.keys(places);
    return(
        <div className="p-10 h-auto overflow-auto">
            {array?.map((place, index) => {
                const id = places[index];
                const placeData = locationData[id];
                if (placeData.title) {
                    return (
                        <PlaceCard destroy={destroy} id={id} activeMarker={activeMarker} data={placeData} key={id} title={placeData.title} onClick={e => callback({index: id, domEvent: e})} />
                    );
                }
                return null;
            })}
        </div>

    )
}
export default Places;