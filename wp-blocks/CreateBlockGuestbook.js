import { gql } from '@apollo/client';
import React from 'react';

export default function CreateBlockGuestbook(props) {
    const {content} = props;
    console.log(content);
    return (
        <>
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
        }
      }
  `,
    key: `CreateBlockGuestbookFragment`,
};

CreateBlockGuestbook.displayName = 'CreateBlockGuestbook';