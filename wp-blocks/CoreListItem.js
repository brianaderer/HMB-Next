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
