import { gql } from '@apollo/client';
import React from 'react';
import { WordPressBlocksViewer } from '@faustwp/blocks';
import * as queries from '../queries/queryBlocks/index';
import {StickyPortal} from "../components";

export default function CoreButtons(props) {
    const {attributes, anchor, innerBlocks, name, cssClassNames, clientId} = props;
    const classes = cssClassNames?.join(' ');
    return (
        <>
            <div id={clientId}></div>
            <StickyPortal targetId={clientId}>
                <div className={`group-[.collapsed]:hidden flex flex-row max-w-full flex-wrap items-center gap-4 w-full pb-2 group-[.stickyContainer]:p-4 group-[.stickyContainer]:justify-center group-[.stickyContainer]:py-2 lg:group-[.stickyContainer]:py-4 group-[.stickyContainer]:w-full lg:p-4 bg-base-100 rounded-b-lg ${classes}`}>
                    <WordPressBlocksViewer blocks={(innerBlocks)} />
                </div>
            </StickyPortal>
        </>
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