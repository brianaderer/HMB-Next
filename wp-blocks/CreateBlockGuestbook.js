import { gql } from '@apollo/client';
import React, {useState} from 'react';
import {GuestBookEntry, LoadMore} from "../components";

export default function CreateBlockGuestbook(props) {
    const increment = 3;
    const [limit, setLimit] = useState(increment);
    const {content} = props;
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
          beam
          boat_length_loa
          boat_name
          boat_type
          draft
          email
          full_name
          message
          phone_number
          year_make_model
          return_image_gallery
          reply
        }
      }
  `,
    key: `CreateBlockGuestbookFragment`,
};

CreateBlockGuestbook.displayName = 'CreateBlockGuestbook';