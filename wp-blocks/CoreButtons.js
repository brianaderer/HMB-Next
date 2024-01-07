import { gql } from '@apollo/client';
import React from 'react';
import { WordPressBlocksViewer } from '@faustwp/blocks';
import * as queries from '../queries/queryBlocks/index';

export default function CoreButtons(props) {
    const {attributes, anchor, innerBlocks, name} = props;
    return (
        <div className={`flex flex-row gap-4 w-full p-4 -mt-4 bg-base-100 mb-4`}>
            <WordPressBlocksViewer blocks={(innerBlocks)} />
        </div>
    );
}

CoreButtons.fragments = {
    entry: gql`
    fragment CoreButtonsFragment on CoreButtons {
           ${queries.buttons}
      }
  `,
    key: `CoreButtonsFragment`,
};

CoreButtons.displayName = 'CoreButtons';