import { gql } from '@apollo/client';
import React, {useState} from 'react';
import {
    Form,
    Login,
} from "../components";

export default function AcfUploadMediaForm(props) {
    const submitter = async props => {
        return await fetch("/api/upload", {
            method: "POST",
            body: JSON.stringify(props),
            headers: {
                "Content-Type": "application/json",
            },
        });
    };
    const data = props.mediaData;
    const fieldsData = JSON.parse(data);
    const headline = 'Manage Your Media';
    const message = 'Please Log In to Edit Your Information';
    const id = 'signUp';

    return (
        <Login id={id} message={message}>
            <Form fieldsData={fieldsData} submitter={submitter} headline={headline}/>
        </Login>
    );
}

AcfUploadMediaForm.fragments = {
    entry: gql`
    fragment AcfUploadMediaFormFragment on AcfUploadMediaForm {
      mediaData
    }
  `,
    key: `AcfUploadMediaFormFragment`,
};

AcfUploadMediaForm.displayName = 'AcfUploadMediaForm';