const Places = props => {
    const {callback} = props;
    const array = Object.keys(props);
    return(
        <ul className={`pr-4 h-auto overflow-auto w-1/3 grow-0`}>
            {array?.map((place,index) => {
                return(
                        <li onClick={ e => callback({index: index, domEvent: e})} className={`text-right`} key={index}>{props[place].title}</li>
                    );
            })}
        </ul>
    )
}
export default Places;