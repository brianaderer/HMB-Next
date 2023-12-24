import { signInWithPopup, getAuth, onAuthStateChanged } from "firebase/auth";
import { auth, providers } from './firebase';
import { useEffect, useState } from 'react';
import {preUserLogin} from "./preUserLogin";
import {Timestamp} from 'firebase/firestore';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dbUser, setDbUser] = useState({});
    const [checked, setChecked] = useState(false);

    // Sign In Function
    const signIn = async props => {
        const {providerName, id} = props;
        try {
                const result = await signInWithPopup(auth, providers[providerName]);
                const returnedDbUser = await preUserLogin({uuid: result.user.uid, id: id});
                setDbUser( returnedDbUser );
                setChecked( true );
                setUser(result.user);
        } catch (error) {
            console.error("Authentication error:", error);
        }
    };

    // Sign Out Function
    const signOut = async props => {
        try {
            await auth.signOut();
            setUser(null);
        } catch (error) {
            console.error("Error signing out with Google", error);
        }
    };

    // useEffect(() => {
    //     updateTimestamp();
    // }, [dbUser]);

    // const updateTimestamp = props => {
    //     if(user){
    //         updateUserDb({
    //             uid: user.uid,
    //             Timestamp: Timestamp.now(),
    //         }).then(() => {});
    //     }
    // }

    useEffect(() => {
        if(user && checked && dbUser === undefined){
            createUserDb( user ).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
                .then(data => {
                    const { uid, email, displayName, lastLoginAt } = user;
                    setDbUser({
                        'full-name' : displayName,
                        'email' : email,
                        'lastLogin': lastLoginAt,
                    })
                })
                .catch(error => {
                    console.error('There has been a problem with your fetch operation:', error);
                });
        }
    }, [user, checked, dbUser]);
    const createUserDb = async props => {
        return await fetch("/api/checkUserInfo", {
            method: "POST",
            body: JSON.stringify(props),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
    const updateUserDb = async props => {
        return await fetch("/api/updateUserInfo", {
            method: "POST",
            body: JSON.stringify(props),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
    // Observer for user state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        // Clean up subscription on unmount
        return () => unsubscribe();
    }, []);

    return { user, loading, signIn, signOut, setUser, dbUser, setDbUser };
};



