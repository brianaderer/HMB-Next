import React, {useContext} from "react";
import {AuthContext} from "../../contexts";

const SignInButton = props => {
    const {classes} = props;
    const {user, promptSignIn, handleSignOut} = useContext( AuthContext );
    const callback = () => {
        if (user) {
            handleSignOut();
        } else {
            promptSignIn();
        }
    }
    return(
        <button className={`${classes} btn btn-outline`} onClick={callback}>
            {user ? 'Sign Out' : 'Sign In'}
        </button>
    )
}
export default SignInButton;