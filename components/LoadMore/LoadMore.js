import {Button} from '../index';
import {useEffect, useState} from "react";

const LoadMore = props => {
    const {increment, limit, setLimit, max, className} = props;
    const [show, setShow] = useState(true);
    const handleClick = props => {
        setLimit(limit + increment);
    }
    useEffect(() => {
        setShow( limit < max );
    }, [limit, max]);

    return (
        <div className={`w-full flex flex-row justify-center ${className}`}>
            <Button.StandardButton className={`w-2/3 ${show ? '' : 'hidden'}`} callback={handleClick}>Load More</Button.StandardButton>
        </div>
    );
}
export default LoadMore;