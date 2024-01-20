import { gql } from '@apollo/client';
import React from 'react';
import { WordPressBlocksViewer } from '@faustwp/blocks';
import * as queries from '../queries/queryBlocks/index';

export default function CoreButtons(props) {
    const {attributes, anchor, innerBlocks, name, cssClassNames, clientId} = props;
    const classes = cssClassNames?.join(' ');
    return (
        <div id={clientId} className={`flex flex-row items-center gap-4 w-full pb-2 group-[.sticky]:p-4 group-[.sticky]:justify-center group-[.sticky]:py-2 lg:group-[.sticky]:py-4 lg:p-4 bg-base-100 rounded-b-lg ${classes}`}>
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