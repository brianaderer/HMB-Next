import { gql } from '@apollo/client';
import React from 'react';

export default function CoreListItem(props) {
    const {attributes} = props;
    const {content} = attributes;
    return(
        <li>
            {content}
        </li>
    )
}

CoreListItem.fragments = {
    entry: gql`
    fragment CoreListItemFragment on CoreListItem {
                apiVersion
                blockEditorCategoryName
                attributes {
                  content
                }
            }
            `,
    key: `CoreListFragment`,
};

CoreListItem.displayName= 'CoreList';