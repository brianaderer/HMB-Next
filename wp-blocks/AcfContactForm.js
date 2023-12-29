import { gql } from '@apollo/client';
import React from 'react';
import {Form} from "../components";

export default function AcfContactForm(props) {
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

    return (
            <Form fieldsData={fieldsData} submitter={submitter}/>
    );
}

AcfContactForm.fragments = {
    entry: gql`
    fragment AcfContactFormFragment on AcfContactForm {
      contactData
    }
  `,
    key: `AcfContactFormFragment`,
};

AcfContactForm.displayName = 'AcfContactForm';