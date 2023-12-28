import { gql } from '@apollo/client';
import React from 'react';
import {ContentWrapper, Review} from "../components";
import {Carousel} from "flowbite-react";

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
            <h1 className="text-3xl text-center">{meta.headline}</h1>
            <div className="w-full rounded-box bg-hmbBlue-300 p-10 drop-shadow-lg">
            <Carousel pauseOnHover>
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