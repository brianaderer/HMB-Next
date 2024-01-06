import { gql } from '@apollo/client';
import React from 'react';
import { WordPressBlocksViewer } from '@faustwp/blocks';
import * as queries from '../queries/queryBlocks/index';
import components from '../wp-blocks';

export default function CoreButtons(props) {
    const {attributes, anchor, innerBlocks, name} = props;
    console.log(name);
    console.log(attributes);
    return (
        <div className={`flex flex-row gap-4`}>
            <WordPressBlocksViewer blocks={(innerBlocks)} />
        </div>
    );
}

CoreButtons.fragments = {
    entry: gql`
    fragment CoreButtonsFragment on CoreButtons {
        anchor
        apiVersion
        name
        innerBlocks {
          isDynamic
          name
          renderedHtml
          ... on CoreButton {
            ${queries.button}
          }
        }
        clientId
        attributes {
          align
          anchor
          className
          cssClassName
          fontFamily
          fontSize
          layout
          lock
          style
        }
      }
  `,
    key: `CoreButtonsFragment`,
};

CoreButtons.displayName = 'CoreButtons';