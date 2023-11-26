import { gql } from '@apollo/client';
import React, {useState} from 'react';
import {Form} from "../components";

export default function AcfTransientContactForm(props) {
    const data = props.contactData;
    const fieldsData = JSON.parse(data);

    return (
        <>
            <Form fieldsData={fieldsData}/>
            <form>
                {
                    Object.keys(fieldsData).map((field, index) => {
                        const {type, label, ...otherProps} = (fieldsData[field]);
                        return (
                            <div key={index}>
                                {/*<FormElement type={type} label={label} slug={field} {...otherProps} />*/}
                            </div>
                        )
                    })
                }
            </form>
        </>
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