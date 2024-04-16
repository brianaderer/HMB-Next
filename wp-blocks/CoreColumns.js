import { gql } from '@apollo/client';
import React from 'react';
import {Separator} from '../components';
import {WordPressBlocksViewer} from "@faustwp/blocks";
import CoreParagraph from './CoreParagraph';
import CoreHeading from "./CoreHeading";
import CoreList from "./CoreList";

export default function CoreColumns(props) {
    const {attributes, innerBlocks, cssClassNames} = props;
    return (
        <div className={`flex flex-col lg:flex-row items-center gap-4 xl:gap-8 px-4 xl:px-8`}>
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
        }
      }
  `,
    key: `CoreColumnsFragment`,
};

CoreColumns.displayName = 'CoreColumns';