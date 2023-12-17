import React, {useContext, useState} from "react";
import {AuthContext} from "../../contexts";
import {Button, Form, Modal, Loading} from '../index';
import {signUpFormQuery} from "../../queries/signUpFormQuery";
import {useQuery} from "@apollo/client";

const Login = props => {
    const {user, handleSignIn, handleSignOut} = useContext( AuthContext );
    const { data, loading, error } = useQuery(signUpFormQuery);

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
                <button className={`btn btn-outline`} onClick={handleSignOut}>
                Sign Out</button>
            {children}
            </>
            ) : (
            <>
                <Button.SignInButton/>
            </>
            )
        }
    </>
    )
}
export default Login;