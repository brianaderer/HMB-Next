import { gql } from '@apollo/client';
import React from 'react';
import {ContentWrapper, Review} from "../components";

export default function CreateBlockReviews(props) {
    const data = props.renderedHtml;
    console.log(data);
    const reviewsData = JSON.parse(data);
    const reviews = reviewsData.map((review, index) => ({
            reviewersName: review.reviewers_name,
            review : review.review,
            rating : review.rating,
            date : review.date,
            key: index,
    }));
    return (
            reviews.map( review => {
            return(
                <Review key={review.key} data={review} />
            )
        } )

    );
}

CreateBlockReviews.fragments = {
    entry: gql`
    fragment CreateBlockReviewsFragment on CreateBlockReviews {
      renderedHtml
    }
  `,
    key: `CreateBlockReviewsFragment`,
};

CreateBlockReviews.displayName = 'CreateBlockReviews';