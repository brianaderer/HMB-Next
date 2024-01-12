import { gql } from '@apollo/client';
import React from 'react';
import {Separator} from '../components';
import {WordPressBlocksViewer} from "@faustwp/blocks";
import components from './index';

export default function CoreColumn(props) {
    const {attributes, innerBlocks, customAttributes} = props;
    console.log(props);
    return (
        <Separator/>
    );
}

CoreColumn.fragments = {
    entry: gql`
    fragment CoreColumnFragment on CoreColumn {
        anchor
        apiVersion
        name
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
        innerBlocks {
          name
          
        }
      }
  `,
    key: `CoreColumnFragment`,
};

CoreColumn.displayName = 'CoreColumn';