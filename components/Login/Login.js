import React, {useContext} from "react";
import {AuthContext} from "../../contexts";
const Login = props => {
    const {user, setUser, signIn, signOut} = useContext( AuthContext );
    const handleSignIn = () => {
        signIn({setUser});
    };
    const handleSignOut = () => {
        signOut({setUser});
    };
    const {children, message} = props;
    return (
        <>
        {user? (
            <>
                <button onClick={handleSignOut}>Sign Out with Google</button>
                {children}
            </>
            ) : (
            <div>
                <h3>{message}</h3>
                <button className={`btn`} onClick={handleSignIn}>Sign In with Google</button>
            </div>
            )
        }
    </>
    )
}
export default Login;