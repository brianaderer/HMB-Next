import { gql } from '@apollo/client';
import React from 'react';
import {WordPressBlocksViewer} from "@faustwp/blocks";

export default function CoreColumn(props) {
    const {attributes, innerBlocks, customAttributes} = props;
    const {width} = attributes;
    const style = {
        width: width,
    }
    return (
        <div style={style} className={`!w-[95%] !lg-w-[inherit]`}>
            <WordPressBlocksViewer blocks={(innerBlocks)} />
        </div>
    );
}

CoreColumn.fragments = {
    entry: gql`
    fragment CoreColumnFragment on CoreColumn {
        anchor
        apiVersion
        name
        innerBlocks {
          name
        }
      }
  `,
    key: `CoreColumnFragment`,
};

CoreColumn.displayName = 'CoreColumn';