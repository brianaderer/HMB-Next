import { gql } from '@apollo/client';
import React from 'react';
import {ContentWrapper} from "../components";

export default function CoreParagraph(props) {
    const {attributes, customAttributes} = props;
    return (
        <ContentWrapper content={attributes.content} />
    );
}

CoreParagraph.fragments = {
    entry: gql`
    fragment CoreParagraphFragment on CoreParagraph {
    customAttributes
      attributes {
        backgroundColor
        style
        textColor
        fontSize
        fontFamily
        dropCap
        gradient
        align
        content
      }
    }
  `,
    key: `CoreParagraphFragment`,
};

CoreParagraph.displayName = 'CoreParagraph';