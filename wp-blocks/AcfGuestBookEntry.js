import { gql } from '@apollo/client';
import React, {useContext} from 'react';
import {Form, Login} from "../components";
import { SubmitterContext, AuthContext } from "../contexts";

export default function AcfGuestBookEntryEntry(props) {
    const auth = useContext( AuthContext );

    const submitter = async props => {
        // const values = [];
        // return await fetch("/api/hello", {
        //     method: "POST",
        //     body: JSON.stringify(props),
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // });
    };
    const data = props.guestBookData;
    const fieldsData = JSON.parse(data);

    return (
        <>
            {auth ? (
            <SubmitterContext.Provider value={submitter}>
                <Form fieldsData={fieldsData}/>
            </SubmitterContext.Provider>
            ) : (
                <Login/>
            )
            }
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