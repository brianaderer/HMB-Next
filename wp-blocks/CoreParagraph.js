import { gql } from '@apollo/client';
import React from 'react';
import {Text} from "../components";

export default function CoreParagraph(props) {
    const {attributes, customAttributes} = props;
    return (
        <Text tag={'p'} className={`px-16 first:mt-8 indent-8 p-4 bg-neutral text-neutral-content`}>{attributes.content}</Text>
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