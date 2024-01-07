import { gql } from '@apollo/client';
import React from 'react';
import {WordPressBlocksViewer} from "@faustwp/blocks";

export default function CoreMediaText(props) {
    const {attributes, customAttributes, innerBlocks} = props;
    console.log(innerBlocks);
    console.log(attributes);


    return (
        <></>
        // <WordPressBlocksViewer blocks={innerBlocks} />
    );
}

CoreMediaText.fragments = {
    entry: gql`
    fragment CoreMediaTextFragment on CoreMediaText {
        anchor
        innerBlocks {
          blockEditorCategoryName
          clientId
          cssClassNames
          name
        }
        attributes {
          align
          allowedBlocks
          anchor
          backgroundColor
          className
          focalPoint
          fontFamily
          fontSize
          gradient
          href
          imageFill
          isStackedOnMobile
          linkClass
          linkDestination
          verticalAlignment
          textColor
          style
          rel
          mediaWidth
          mediaUrl
          mediaType
          mediaSizeSlug
          mediaPosition
          mediaLink
          mediaId
          mediaAlt
          lock
          linkTarget
        }
      }
  `,
    key: `CoreMediaTextFragment`,
};

CoreMediaText.displayName = 'CoreMediaText';