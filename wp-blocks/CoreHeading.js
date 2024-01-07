import { gql } from '@apollo/client';
import React from 'react';
import {Text} from "../components";
import * as queries from '../queries/queryBlocks';

export default function CoreHeading(props) {
    const {attributes, customAttributes} = props;
    const {level} = attributes;

    return (
        <Text tag={`h${`3`}`} className={`text-xl text-center`}>{attributes.content}</Text>
    );
}

CoreHeading.fragments = {
    entry: gql`
    fragment CoreHeadingFragment on CoreHeading {
        ${queries.heading}
    }
  `,
    key: `CoreHeadingFragment`,
};

CoreHeading.displayName = 'CoreHeading';