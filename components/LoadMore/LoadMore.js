import {Button} from '../index';
import {useEffect, useState} from "react";

const LoadMore = props => {
    const {increment, limit, setLimit, max} = props;
    const [show, setShow] = useState(true);
    const handleClick = props => {
        setLimit(limit + increment);
    }
    useEffect(() => {
        setShow( limit < max );
    }, [limit, max]);

    return (
        <>
            {show && <Button.StandardButton callback={handleClick}>Load More</Button.StandardButton>}
        </>
    );
}
export default LoadMore;