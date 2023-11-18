const Review = props => {
    const {reviewersName, rating, review, date} = props.data;
    return(
    <>
        <h1>{reviewersName}</h1>
        <p>{review}</p>
        <h3>{date}</h3>
        <h3>{rating}</h3>
    </>
    )
}
export default Review;