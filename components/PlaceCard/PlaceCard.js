import {Link} from './Link';
import { Tag } from '../Tag';
import { Card } from '../Card';


const PlaceCard = props => {
    const{data, onClick, activeMarker, id, destroy} = props;
    const expanded = activeMarker?.index === id;
    const handleDestroy = props => {
        destroy({clickedOnMap: false});
    }
    return (
        <Card id={id} key={id} data={data} onClick={onClick} destroy={destroy} activeMarker={activeMarker} />
    );
}

export default PlaceCard;