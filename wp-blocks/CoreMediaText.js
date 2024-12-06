import { gql } from '@apollo/client';
import React from 'react';
import {WordPressBlocksViewer} from "@faustwp/blocks";
import * as queries from '../queries/queryBlocks';
import { Separator, Media } from '../components';

export default function CoreMediaText(props) {
    const {attributes, customAttributes, innerBlocks} = props;
    const {mediaPosition, mediaUrl, mediaType, mediaAlt, mediaSizeSlug, mediaWidth, anchor} = attributes;
    const positionLookup = {
        right: 'lg:flex-row',
        left: 'lg:flex-row-reverse',
    }

    return (
        <div id={anchor} className={`flex flex-col ${positionLookup[mediaPosition]} items-start justify-start gap-8 pb-8`}>
            <div className="w-full lg:w-1/2 flex flex-row items-start justify-center">
                <Media.Image ratio={'square'} src={mediaUrl} size={'medium'} alt={mediaAlt} classes={`rounded drop-shadow-md`}/>
            </div>
            <div className="w-full lg:w-1/2">
                <WordPressBlocksViewer blocks={innerBlocks}/>
            </div>
        </div>
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
          ...on CoreParagraph {
            ${queries.paragraph}
          }
          ...on CoreHeading{
            ${queries.heading}
          }
          ...on CoreButtons {
            ${queries.buttons}
          }
        }
        attributes {
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