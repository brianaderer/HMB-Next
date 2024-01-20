import { gql } from '@apollo/client';
import React from 'react';
import {Text, Review} from "../components";
import {Carousel} from "flowbite-react";

export default function CreateBlockReviews(props) {
    const customTheme = {
        "root": {
            "base": "relative h-full w-full",
            "leftControl": "absolute top-0 -left-4 flex h-full items-center justify-center px-4 focus:outline-none",
            "rightControl": "absolute top-0 -right-4 flex h-full items-center justify-center px-4 focus:outline-none"
        },
        "indicators": {
            "active": {
                "off": "bg-primary hover:border-2 border-secondary",
                "on": "bg-secondary"
            },
            "base": "h-3 w-3 rounded-full",
            "wrapper": "absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3"
        },
        "item": {
            "base": "absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
            "wrapper": {
                "off": "w-full flex-shrink-0 transform cursor-default snap-center",
                "on": "w-full flex-shrink-0 transform cursor-grab snap-center"
            }
        },
        "control": {
            "base": "border-2 lg:border-4 border-secondary/20 bg-neutral rounded-full w-auto h-auto p-0 btn btn-secondary btn-outline inline-flex items-center justify-center rounded-full",
            "icon": "text-lg w-8 lg:w-12 h-8 lg:h-12 p-2 text-primary"
        },
        "scrollContainer": {
            "base": "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-lg",
            "snap": "snap-x"
        }
    }
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
            <Carousel theme={customTheme} pauseOnHover>
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