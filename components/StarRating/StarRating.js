import * as React from 'react';
import Rating from '@mui/material/Rating';
const StarRating = props => {
    const {value} = props;
    const cleanedValue = Math.round(value * 10) / 10;
    return(
    <>
        <Rating name="deci-rating-read" defaultValue={cleanedValue} precision={0.1} readOnly/>
    </>
    )
}
export default StarRating;