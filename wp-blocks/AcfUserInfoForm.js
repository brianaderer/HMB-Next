import { gql } from '@apollo/client';
import React, {useState} from 'react';
import {
    Form,
    Login,

} from "../components";

export default function AcfUserInfoForm(props) {
    const submitter = async props => {
        const values = [];
        return await fetch("/api/updateUserInfo", {
            method: "POST",
            body: JSON.stringify(props),
            headers: {
                "Content-Type": "application/json",
            },
        });
    };
    const data = props.userInfoData;
    const fieldsData = JSON.parse(data);
    const headline = 'Care to tell us about yourself? All fields are optional';
    const message = 'Please Log In to Edit Your Information';
    const id = 'signUp';

    return (
        <Form login={true} loginMessage={message} fieldsData={fieldsData} submitter={submitter} headline={headline}/>
    );
}

AcfUserInfoForm.fragments = {
    entry: gql`
    fragment AcfUserInfoFormFragment on AcfUserInfoForm {
      userInfoData
    }
  `,
    key: `AcfUserInfoFormFragment`,
};

AcfUserInfoForm.displayName = 'AcfUserInfoForm';