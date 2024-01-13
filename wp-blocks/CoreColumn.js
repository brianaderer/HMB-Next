import { gql } from '@apollo/client';
import React from 'react';
import {Separator} from '../components';
import {WordPressBlocksViewer} from "@faustwp/blocks";
import CoreParagraph from '../wp-blocks/CoreParagraph';
import {blocks, fragments} from "../zblocks";

export default function CoreColumn(props) {
    const {attributes, innerBlocks, customAttributes} = props;
    const {width} = attributes;
    const style = {
        width: width,
    }
    return (
        <div style={style}>
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