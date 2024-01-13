import { gql } from '@apollo/client';
import React from 'react';
import {Separator} from '../components';
import {WordPressBlocksViewer} from "@faustwp/blocks";
import CoreParagraph from './CoreParagraph';
import CoreHeading from "./CoreHeading";
import CoreList from "./CoreList";

export default function CoreColumns(props) {
    const {attributes, innerBlocks} = props;
    return (
        <div className={`flex flex-row items-center gap-4 p-8`}>
            <WordPressBlocksViewer blocks={innerBlocks} />
        </div>
    );
}

CoreColumns.fragments = {
    entry: gql`
    ${CoreParagraph.fragments.entry}
    ${CoreHeading.fragments.entry}
    ${CoreList.fragments.entry}
    fragment CoreColumnsFragment on CoreColumns {
        anchor
        cssClassNames
        attributes {
          align
          anchor
          backgroundColor
          borderColor
          className
          cssClassName
          fontFamily
          fontSize
          verticalAlignment
          textColor
          style
          lock
          layout
          isStackedOnMobile
          gradient
        }
        innerBlocks {
          apiVersion
          name
          clientId
          ...on CoreColumn{
            attributes {
                  allowedBlocks
                  anchor
                  backgroundColor
                  borderColor
                  className
                  cssClassName
                  fontFamily
                  fontSize
                  width
                  verticalAlignment
                  textColor
                  style
                  lock
                  layout
                  gradient
                }
            innerBlocks{
                apiVersion
                clientId
                name
                ...${CoreParagraph.fragments.key}
                ...${CoreHeading.fragments.key}
                ...${CoreList.fragments.key}
            }
          }
        }
      }
  `,
    key: `CoreColumnsFragment`,
};

CoreColumns.displayName = 'CoreColumns';