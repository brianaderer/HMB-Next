import { gql } from '@apollo/client';
import React from 'react';
import {ContentWrapper} from "../components";

export default function CoreParagraph(props) {
    const attributes = props.attributes;
    return (
        <ContentWrapper content={attributes.content} />
    );
}

CoreParagraph.fragments = {
    entry: gql`
    fragment CoreParagraphFragment on CoreParagraph {
      attributes {
        cssClassName
        backgroundColor
        style
        textColor
        fontSize
        fontFamily
        direction
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