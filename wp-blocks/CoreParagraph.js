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
        content
      }
    }
  `,
    key: `CoreParagraphFragment`,
};

CoreParagraph.displayName = 'CoreParagraph';