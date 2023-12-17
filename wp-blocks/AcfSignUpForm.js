import { gql } from '@apollo/client';
import React from 'react';
import {
    Form,
    Login,
} from "../components";

export default function AcfSignUpForm(props) {
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
    const data = props.contactData;
    const fieldsData = JSON.parse(data);
    const headline = 'Care to tell us about yourself? All fields are optional';
    const message = 'Please Log In to Edit Your Information';

    return (
        <Login message={message}>
            <Form fieldsData={fieldsData} submitter={submitter} headline={headline}/>
        </Login>
    );
}

AcfSignUpForm.fragments = {
    entry: gql`
    fragment AcfSignUpFormFragment on AcfSignUpForm {
      contactData
    }
  `,
    key: `AcfSignUpFormFragment`,
};

AcfSignUpForm.displayName = 'AcfSignUpForm';