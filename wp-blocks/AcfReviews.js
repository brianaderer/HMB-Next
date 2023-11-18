import { gql } from '@apollo/client';
import React from 'react';
import {ContentWrapper, Review} from "../components";

export default function AcfReviews(props) {
    const data = props.attributes.data;
    const reviewsData = JSON.parse(data);
    // Initialize an array to hold the structured reviews
    let reviews = [];

// Loop through the number of reviews
    for (let i = 0; i < reviewsData.reviews_repeater; i++) {
        let review = {
            reviewersName: reviewsData[`reviews_repeater_${i}_reviewers_name`],
            review: reviewsData[`reviews_repeater_${i}_review`],
            rating: reviewsData[`reviews_repeater_${i}_rating`],
            date: reviewsData[`reviews_repeater_${i}_date`],
            key: i,
        };
        reviews.push(review);
    }

// `reviews` now holds the structured data

    return (
            reviews.map( review => {
            return(
                <Review key={review.key} data={review} />
            )
        } )

    );
}

AcfReviews.fragments = {
    entry: gql`
    fragment AcfReviewsFragment on AcfReviews {
      attributes {
        data
      }
    }
  `,
    key: `AcfReviewsFragment`,
};

AcfReviews.displayName = 'AcfReviews';