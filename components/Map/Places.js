import {PlaceCard} from '../PlaceCard';
const Places = props => {
    const {callback, places, activeMarker} = props;
    const array = Object.keys(places);
    return(
        <div className="p-10 h-auto overflow-auto">
            {array?.map((place, index) => {
                if (places[place].title) {
                    return (
                        <PlaceCard activeMarker={activeMarker} data={places[place]} key={index} title={places[place].title} onClick={e => callback({index: index, domEvent: e})} />
                    );
                }
                return null;
            })}
        </div>

    )
}
export default Places;