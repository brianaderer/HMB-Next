import React, {useContext, useState} from "react";
import {AuthContext} from "../../contexts";
import {Button, Form, Modal, Loading, Text} from '../index';
import {signUpFormQuery} from "../../queries/signUpFormQuery";
import {useQuery} from "@apollo/client";

const Login = props => {
    const {user, handleSignIn, handleSignOut} = useContext( AuthContext );
    const { data, loading, error } = useQuery(signUpFormQuery);

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

    let fieldsData = [];
    if (data) {
        // Parse data if it's defined
        fieldsData = JSON.parse(data.globalSignUpForm);
    }
    const headline = 'Care to tell us about yourself? All fields are optional';

    const {children, message, id} = props;
    return (
        <>
        {user? (
            <>
                <Modal id={'signUp'}>
                    { loading ? ( <Loading/> ) : (
                        <Form fieldsData={fieldsData} submitter={submitter} headline={headline}/>
                        )
                    }
                </Modal>
            {children}
            </>
            ) : (
            <div className={`rounded-lg p-8 flex flex-col items-center justify-center bg-base-100`}>
                <Text className={`mb-8`}>{message}</Text>
                <Button.SignInButton/>
            </div>
            )
        }
    </>
    )
}
export default Login;