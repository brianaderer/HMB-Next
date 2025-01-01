import { gql } from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {GuestBookEntry, LoadMore} from "../components";

export default function CreateBlockGuestbook(props) {
    useEffect(() => {
        console.log('CreateBlockGuestBook');
    });

    const increment = 5;
    const [limit, setLimit] = useState(increment);
    const {content} = props;
    const max = Object.keys(content).length;
    return (
        <>
            { content.map((entry, index) => {
                    if( index < limit ){
                        return <GuestBookEntry key={index} entry={entry}/>
                    }
                })
            }
            <LoadMore limit={limit} setLimit={setLimit} increment={increment} max={max} />
        </>
    );
}

CreateBlockGuestbook.fragments = {
    entry: gql`
    fragment CreateBlockGuestbookFragment on CreateBlockGuestbook {
        renderedHtml
        apiVersion
        blockEditorCategoryName
        name
        clientId
        attributes {
          className
        }
        content {
            acfFields {
                boatLengthLoa
                beam
                boatName
                boatType
                reply
                yearMakeModel
                draft
            }
            customFields {
                message
                name
            }
            imageGallery {
                alt
                caption
                description
                iD
                name
                type
                title
                src
            }
        }
      }
  `,
    key: `CreateBlockGuestbookFragment`,
};

CreateBlockGuestbook.displayName = 'CreateBlockGuestbook';