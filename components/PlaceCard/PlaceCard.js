import { Card } from '../Card';
import {useState} from "react";

const PlaceCard = props => {
    const{data, onClick, activeMarker, id, destroy, firstPlace, catSlug, distance} = props;
    const [forceExpanded, setForceExpanded] = useState(false)
    const expanded = activeMarker?.index === id || forceExpanded;
    const handleDestroy = props => {
        destroy({clickedOnMap: false});
    }

    return (
        <Card forceExpanded={forceExpanded} setForceExpanded={setForceExpanded} distance={distance} catSlug={catSlug} firstPlace={firstPlace} expanded={expanded} id={id} key={id} data={data} callback={onClick} handleDestroy={handleDestroy} activeMarker={activeMarker} />
    );
}

export default PlaceCard;