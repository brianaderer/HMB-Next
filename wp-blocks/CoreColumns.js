import { gql } from '@apollo/client';
import React from 'react';
import {Separator} from '../components';
import {WordPressBlocksViewer} from "@faustwp/blocks";
import components from './index';

export default function CoreColumns(props) {
    const {attributes, innerBlocks} = props;
    return (
        <>
            <WordPressBlocksViewer blocks={innerBlocks} />
        </>
    );
}

CoreColumns.fragments = {
    entry: gql`
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
            innerBlocks{
                apiVersion
                clientId
                name
                ... on CoreParagraph{
                    apiVersion
                    clientId
                    attributes{
                        content
                    }
                }
            }
          }
        }
      }
  `,
    key: `CoreColumnsFragment`,
};

CoreColumns.displayName = 'CoreColumns';