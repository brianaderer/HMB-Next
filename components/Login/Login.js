import React, {useContext} from "react";
import {AuthContext} from "../../contexts";
import {Button} from '../index';
const Login = props => {
    const {user, setUser, signIn, signOut} = useContext( AuthContext );
    const handleSignIn = props => {
        const {providerName} = props;
        signIn({setUser, providerName});
    };
    const handleSignOut = () => {
        signOut({setUser});
    };
    const {children, message} = props;
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
                <Button.AuthButton callback={handleSignIn} />
            </div>
            )
        }
    </>
    )
}
export default Login;