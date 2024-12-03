import { gql } from '@apollo/client';
import React, {useState} from 'react';
import {GuestBookEntry, LoadMore} from "../components";

export default function CreateBlockGuestbook(props) {
    const increment = 5;
    const [limit, setLimit] = useState(increment);
    const {content} = props;
    console.log(content);
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
            guestBookEntryField {
                approved
                beam
                boatLengthLoa
                boatName
                boatType
                draft
                fieldGroupName
                reply
                yearMakeModel
            }
        }
      }
  `,
    key: `CreateBlockGuestbookFragment`,
};

CreateBlockGuestbook.displayName = 'CreateBlockGuestbook';