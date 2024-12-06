import { gql } from '@apollo/client';
import React from 'react';
import {WordPressBlocksViewer} from "@faustwp/blocks";
import components from '../wp-blocks';

export default function CoreList(props) {
    const {attributes, customAttributes, innerBlocks} = props;


    return (
        <ul className={`list-disc list-inside rounded-tl-3xl pt-8 border-t-4 border-t-base-100 z-10 rounded-br-3xl pb-8 mb-4 xl:px-16 xl:pl-8 indent-8 p-4 bg-neutral text-neutral-content drop-shadow-md`}>
            <WordPressBlocksViewer blocks={innerBlocks} />
        </ul>
    );
}

CoreList.fragments = {
    entry: gql`
    fragment CoreListFragment on CoreList {
            anchor
            apiVersion
            innerBlocks {
              ... on CoreListItem {
                apiVersion
                blockEditorCategoryName
                renderedHtml
              }
              name
            }
            attributes {
              values
              type
              textColor
              style
              start
              reversed
              placeholder
              ordered
              lock
              fontSize
              gradient
              fontFamily
              cssClassName
              className
              backgroundColor
              anchor
            }
          }
  `,
    key: `CoreListFragment`,
};

CoreList.displayName = 'CoreList';