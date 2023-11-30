import { gql } from '@apollo/client';
import React, {useContext} from 'react';
import {Form, Login} from "../components";
import { SubmitterContext, AuthContext } from "../contexts";

export default function AcfGuestBookEntryEntry(props) {
    const {user, setUser, signIn, signOut} = useContext( AuthContext );

    const handleSignIn = () => {
        signIn({setUser});
    };
    const handleSignOut = () => {
        signOut({setUser});
    };

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
            {user? (
            <SubmitterContext.Provider value={submitter}>
                <button onClick={handleSignOut}>Sign Out with Google</button>
                <Form fieldsData={fieldsData}/>
            </SubmitterContext.Provider>
            ) : (
                <Login>
                    <button onClick={handleSignIn}>Sign In with Google</button>
                </ Login>
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