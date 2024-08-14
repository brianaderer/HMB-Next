import React, {useContext} from "react";
import {AuthContext} from "../../contexts";
import Link from 'next/link';

const ProfileToggle = props => {
    const {path} = props;
    const authContext = useContext(AuthContext);
    const { user, promptSignIn, handleSignOut } = authContext || {};
    const signInOut = props => {
        if (!user) {
            promptSignIn();
        } else {
            handleSignOut();
        }
    }
    return (
        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        {user && <li><a href={path}>Profile</a></li>}
        <li><a onClick={signInOut}>{user ? 'Logout' : 'Sign In'}</a></li>
    </ul>
    )
}
export default ProfileToggle;