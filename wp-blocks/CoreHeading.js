import { gql } from '@apollo/client';
import React from 'react';
import {Text} from "../components";

export default function CoreHeading(props) {
    const {attributes, customAttributes} = props;
    const {level} = attributes;

    return (
        <Text tag={`h${level}`} className={`text-xl text-center`}>{attributes.content}</Text>
    );
}

CoreHeading.fragments = {
    entry: gql`
    fragment CoreHeadingFragment on CoreHeading {
      attributes {
        align
        anchor
        backgroundColor
        content
        fontFamily
        fontSize
        gradient
        level
        style
        textAlign
        textColor
        cssClassName
      }
    }
  `,
    key: `CoreHeadingFragment`,
};

CoreHeading.displayName = 'CoreHeading';