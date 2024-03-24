import React, {useContext} from "react";
import {AuthContext} from "../../contexts";
import {default as ProfileToggle} from './ProfileToggle';

const Dropdown = props => {
    const {profile, open} = props;
    const { id, path, label, children, cssClasses } = profile;
    const authContext = useContext(AuthContext);
    const { user, promptSignIn, handleSignOut } = authContext || {};
    const photo = user ? user.photoURL : '/assets/noUser.png';
    return(
        <div className="flex-none gap-2">
            <details id={id} open={open === id} className={`dropdown dropdown-end`}>
                <summary tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img alt="User Avatar" src={photo} />
                    </div>
                </summary>
                <ProfileToggle path={path}/>
            </details>
        </div>
    )
}

export default Dropdown;