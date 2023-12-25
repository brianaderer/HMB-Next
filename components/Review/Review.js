import {StarRating} from "../StarRating";

const Review = props => {
    const {reviewersName, rating, review, date} = props.data;
    return(
    <div className={`bg-hmbBlue-100 w-fit p-10 rounded-lg flex flex-col items-center grow-0 justify-center border-8 border-hmbBlue-200 drop-shadow-lg`}>
        <h1>{reviewersName}</h1>
        <p>{review}</p>
        <h3>{date}</h3>
        <StarRating value={rating}/>
    </div>
    )
}
export default Review;