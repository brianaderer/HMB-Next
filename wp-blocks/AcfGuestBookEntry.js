import { gql } from '@apollo/client';
import React from 'react';
import {Form, Login} from "../components";

export default function AcfGuestBookEntryEntry(props) {

    const submitter = async props => {
        const values = [];
        await fetch("/api/comment", {
            method: "POST",
            body: JSON.stringify(props),
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await fetch("/api/updateUserInfo", {
            method: "POST",
            body: JSON.stringify(props),
            headers: {
                "Content-Type": "application/json",
            },
        });
    };

    const data = props.guestBookData;
    const fieldsData = JSON.parse(data);
    const message = 'Please Log In to Write In Our Guest Book';
    return (
        <>
            <Form login={true} loginMessage={message} referrer={'GuestBook'} sendAllImage={false} fieldsData={fieldsData} submitter={submitter}/>
        </>
    );
}

AcfGuestBookEntryEntry.fragments = {
    entry: gql`
    fragment AcfGuestBookEntryFormFragment on AcfGuestBookEntry {
      guestBookData
    }
  `,
    key: `AcfGuestBookEntryFormFragment`,
};

AcfGuestBookEntryEntry.displayName = 'AcfGuestBookEntry';