import { gql } from '@apollo/client';
import React, {useState} from 'react';
import {
    Form,
    Login,
    Modal,
} from "../components";

export default function AcfSignUpForm(props) {
    const [modalOpen, setModalOpen] = useState(false);
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
    const id = 'signUp';

    const handleCloseModal = async props => {
        document?.getElementById(id).close();
        console.log('closed');
    }

    return (
        <Login id={id} message={message}>
            <Modal id={id} onModalClose={handleCloseModal}>
                <Form fieldsData={fieldsData} submitter={submitter} headline={headline}/>
            </Modal>
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