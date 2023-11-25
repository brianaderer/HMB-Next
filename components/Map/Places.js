const Places = props => {
    const array = Object.keys(props);
    return(
        <>
            {array?.map((place,index) => {
                return(
                        <p key={index}>{props[place].title}</p>
                    );
            })}
        </>
    )
}
export default Places;