import { gql } from '@apollo/client';
import React from 'react';
import {Form} from "../components";
import { SubmitterContext } from "../components/Contexts";

export default function AcfGuestBookEntryEntry(props) {
    const submitter = async props => {
        const values = [];
        return await fetch("/api/hello", {
            method: "POST",
            body: JSON.stringify(props),
            headers: {
                "Content-Type": "application/json",
            },
        });
    };
    const data = props.guestBookData;
    const fieldsData = JSON.parse(data);

    return (
        <SubmitterContext.Provider value={submitter}>
            <Form fieldsData={fieldsData}/>
        </SubmitterContext.Provider>
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