import React, {useContext} from "react";
import {AuthContext} from "../../contexts";
import {Button} from '../index';
const Login = props => {
    const {user, setUser, signIn, signOut} = useContext( AuthContext );

    const handleSignIn = props => {
        const {id, providerName} = props;
        signIn({setUser, providerName, id});
    };
    const handleSignOut = () => {
        signOut({setUser});
    };
    const {children, message, id} = props;
    return (
        <>
        {user? (
            <>
                <button className={`btn btn-outline`} onClick={handleSignOut}>
                    Sign Out</button>
                {children}
            </>
            ) : (
            <div>
                <h3>{message}</h3>
                <Button.AuthButton message={'Google'} providerName={'Google'} id={id} callback={() => handleSignIn({id, providerName: 'Google'})} />
                <Button.AuthButton message={'Facebook'} providerName={'Facebook'} id={id} callback={() => handleSignIn({id, providerName: 'Facebook'})} />
            </div>
            )
        }
    </>
    )
}
export default Login;