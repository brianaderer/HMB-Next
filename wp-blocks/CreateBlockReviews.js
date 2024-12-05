import { gql } from '@apollo/client';
import React from 'react';
import {Review} from "../components";
import {Carousel} from '../components';

export default function CreateBlockReviews(props) {
    const data = props.renderedHtml;
    const parsedData = JSON.parse(data);
    const {reviewsData, meta} = parsedData;
    const reviews = reviewsData.map((review, index) => ({
            reviewersName: review.reviewers_name,
            review : review.review,
            rating : review.rating,
            date : new Date(review.date),
            key: index,
            sourceLabel: review.source.label,
    }));
    reviews.sort((a, b) => b.date - a.date);
    return (
        <>
            <div className="w-full rounded-box p-2 lg:p-6 drop-shadow-lg">
            <Carousel fullWidth={'noCrop'} scrollInterval={7000} className={``}>
            {
                reviews.map((review) => {
                    return (
                            <Review key={review.key} data={review}/>
                    )
                })
            }
            </Carousel>
            </div>
        </>
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