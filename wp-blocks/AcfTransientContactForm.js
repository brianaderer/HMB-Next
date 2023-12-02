import { gql } from '@apollo/client';
import React from 'react';
import {Form} from "../components";

export default function AcfTransientContactForm(props) {
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

AcfTransientContactForm.fragments = {
    entry: gql`
    fragment AcfTransientsContactFormFragment on AcfTransientContactForm {
      contactData
    }
  `,
    key: `AcfTransientsContactFormFragment`,
};

AcfTransientContactForm.displayName = 'AcfTransientContactForm';