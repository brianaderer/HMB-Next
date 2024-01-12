import { gql } from '@apollo/client';
import React from 'react';
import {Separator} from '../components';
import {WordPressBlocksViewer} from "@faustwp/blocks";
import CoreParagraph from '../wp-blocks/CoreParagraph';
import {blocks, fragments} from "../zblocks";

export default function CoreColumn(props) {
    const {attributes, innerBlocks, customAttributes} = props;
    console.log(props);
    return (
        <WordPressBlocksViewer blocks={(innerBlocks)} />
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
      }
  `,
    key: `CoreColumnFragment`,
};

CoreColumn.displayName = 'CoreColumn';