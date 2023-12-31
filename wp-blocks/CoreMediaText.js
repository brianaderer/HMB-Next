import { gql } from '@apollo/client';
import React from 'react';
import {WordPressBlocksViewer} from "@faustwp/blocks";
import * as queries from '../queries/queryBlocks';
import { Separator, Media } from '../components';

export default function CoreMediaText(props) {
    const {attributes, customAttributes, innerBlocks} = props;
    const {mediaPosition, mediaUrl, mediaType, mediaAlt, mediaSizeSlug, mediaWidth, anchor} = attributes;
    const positionLookup = {
        right: 'flex-row',
        left: 'flex-row-reverse',
    }


    return (
        <div id={anchor} className={`flex ${positionLookup[mediaPosition]} items-center gap-8 pb-8`}>
            <div className="w-1/2 flex flex-row items-center justify-center">
                <Media.Image ratio={'square'} src={mediaUrl} size={'medium'} alt={mediaAlt} classes={`rounded drop-shadow-lg`}/>
            </div>
            <div className="w-1/2">
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