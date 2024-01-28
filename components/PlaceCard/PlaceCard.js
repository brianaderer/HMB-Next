import { Card } from '../Card';

const PlaceCard = props => {
    const{data, onClick, activeMarker, id, destroy, firstPlace, catSlug} = props;
    const expanded = activeMarker?.index === id;
    const handleDestroy = props => {
        destroy({clickedOnMap: false});
    }

    return (
        <Card catSlug={catSlug} firstPlace={firstPlace} expanded={expanded} id={id} key={id} data={data} callback={onClick} handleDestroy={handleDestroy} activeMarker={activeMarker} />
    );
}

export default PlaceCard;