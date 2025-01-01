import React, { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../contexts";
import { default as ProfileToggle } from './ProfileToggle';

const Dropdown = (props) => {
    const { profile } = props;
    const { id, path } = profile;
    const authContext = useContext(AuthContext);
    const { user } = authContext || {};
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null); // Create a ref for the outer div
    const photo = user ? user.photoURL : '/assets/noUser.png';

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    // Close the dropdown when clicking outside
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <div ref={dropdownRef} className="flex-none gap-2">
            <details id={id} open={open} className={`dropdown dropdown-end`}>
                <summary
                    tabIndex={0}
                    role="button"
                    onClick={handleClick}
                    className="btn btn-ghost btn-circle avatar"
                >
                    <div className="w-10 rounded-full">
                        <img alt="User Avatar" src={photo} />
                    </div>
                </summary>
                <ProfileToggle path={path} />
            </details>
        </div>
    );
};

export default Dropdown;
