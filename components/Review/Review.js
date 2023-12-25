import {StarRating} from "../StarRating";

const Review = props => {
    const {reviewersName, rating, review, date, sourceLabel, index} = props.data;
    const getFormattedDate = (date) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

        const d = new Date(date);
        const day = d.getDate();
        const monthIndex = d.getMonth();
        const year = d.getFullYear();

        return `${monthNames[monthIndex]}, ${day} ${year}`;
    };
    return(
    <div className={`m-auto h-full flex flex-row justify-center items-center w-5/6`}>
        <div className={`bg-hmbBlue-100 h-full py-10 px-[10%] flex-grow rounded-lg flex flex-col items-center justify-center border-8 border-hmbBlue-200 drop-shadow-lg mx-10`}>
            <p className={`text-center`}>{review}</p>
            <p>- {reviewersName}</p>
            <h3>{getFormattedDate( date )}</h3>
            <StarRating value={rating}/>
            <p>{sourceLabel}</p>
        </div>
    </div>
    )
}
export default Review;