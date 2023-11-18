import { gql } from '@apollo/client';
import React from 'react';
import {ContentWrapper, FormElement} from "../components";

export default function AcfTransientContactForm(props) {
    const data = props.contactData;
    const fieldsData = JSON.parse(data);

    return (
        Object.keys(fieldsData).map( (field, index) => {
            const {type, label}= (fieldsData[field]);
            console.log(field);
            return(
                <div key={index}>
                    <FormElement type={type} label={label} slug={field} />
                </div>
            )
        } )

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