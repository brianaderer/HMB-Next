import { gql } from '@apollo/client';
import React, {useContext} from 'react';
import {Form, Login} from "../components";
import {AuthContext } from "../contexts";

export default function AcfGuestBookEntryEntry(props) {
    const {user, setUser, signIn, signOut} = useContext( AuthContext );

    const handleSignIn = () => {
        signIn({setUser});
    };
    const handleSignOut = () => {
        signOut({setUser});
    };

    const submitter = async props => {
        const values = [];
        return await fetch("/api/comment", {
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
        <>
            {user? (
            <>
                <button onClick={handleSignOut}>Sign Out with Google</button>
                <Form user={user} fieldsData={fieldsData} submitter={submitter}/>
            </>
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