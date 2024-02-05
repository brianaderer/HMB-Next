import { Card } from '../Card';

const PlaceCard = props => {
    const{data, onClick, activeMarker, id, destroy, firstPlace, catSlug, distance} = props;
    const expanded = activeMarker?.index === id;
    const handleDestroy = props => {
        destroy({clickedOnMap: false});
    }

    return (
        <Card distance={distance} catSlug={catSlug} firstPlace={firstPlace} expanded={expanded} id={id} key={id} data={data} callback={onClick} handleDestroy={handleDestroy} activeMarker={activeMarker} />
    );
}

export default PlaceCard;