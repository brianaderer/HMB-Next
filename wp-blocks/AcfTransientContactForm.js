import { gql } from '@apollo/client';
import React, {createContext, useState} from 'react';
import {Form} from "../components";
import { SubmitterContext } from "../components/Contexts";

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
        <SubmitterContext.Provider value={submitter}>
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
        </SubmitterContext.Provider>
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