import React from 'react';

export default function CoreListItem(props) {
    const {renderedHtml} = props;
    return(
        <li>
            {renderedHtml}
        </li>
    )
}
