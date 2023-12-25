import {PlaceCard} from '../PlaceCard';
const Places = props => {
    const {callback} = props;
    const array = Object.keys(props);
    return(
        <div className="p-10 h-auto overflow-auto">
            {array?.map((place, index) => {
                if (props[place].title) {
                    return (
                        <PlaceCard data={props[place]} key={index} title={props[place].title} onClick={e => callback({index: index, domEvent: e})} />
                    );
                }
                return null;
            })}
        </div>

    )
}
export default Places;