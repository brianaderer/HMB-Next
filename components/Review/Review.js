import {StarRating, Text} from "../../components";

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
    <div className={`m-auto h-full flex flex-row justify-center items-center flex-shrink-0 w-full`}>
        <div className={`h-full px-4 pt-8 lg:px-[10%] flex-grow rounded-lg flex flex-col items-center justify-center mb-12 lg:mx-10 gap-2 lg:gap-4`}>
            <Text tag={'p'} className={`lg:text-center text-sm`}>{review}</Text>
            <Text className={`text-xl text-bold my-4`} tag={'p'}>{`- ${reviewersName}`}</Text>
            <Text tag={'h3'}>{getFormattedDate( date )}</Text>
            <StarRating value={rating}/>
            <Text tag={'p'}>{sourceLabel}</Text>
        </div>
    </div>
    )
}
export default Review;