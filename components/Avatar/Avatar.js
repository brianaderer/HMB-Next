import React, {useContext} from "react";
import {AuthContext} from "../../contexts";

const Dropdown = props => {
    const {profile, open} = props;
    const { id, path, label, children, cssClasses } = profile;
    const authContext = useContext(AuthContext);
    const { user, promptSignIn, handleSignOut } = authContext || {};
    const photo = user ? user.photoURL : '/assets/noUser.png';
    const signInOut = props => {
        if (!user) {
            promptSignIn();
        } else {
            handleSignOut();
        }
    }
    return(
        <div className="flex-none gap-2">
            <details id={id} open={open === id} className={`dropdown dropdown-end`}>
                <summary tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img alt="User Avatar" src={photo} />
                    </div>
                </summary>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                    {user && <li><a href={path}>Profile</a></li>}
                    <li><a onClick={signInOut}>{user ? 'Logout' : 'Sign In'}</a></li>
                </ul>
            </details>
        </div>
    )
}

export default Dropdown;