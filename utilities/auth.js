import { signInWithPopup, getAuth, onAuthStateChanged } from "firebase/auth";
import { auth, providers } from './firebase';
import { useEffect, useState } from 'react';
import {isNewUser} from "./isNewUser";

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Sign In Function
    const signIn = async props => {
        const {providerName} = props;
        try {
                const result = await signInWithPopup(auth, providers[providerName]);
                const user = await isNewUser({uuid: result.user.uid});
                console.log(user);
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

    // Observer for user state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        // Clean up subscription on unmount
        return () => unsubscribe();
    }, []);

    return { user, loading, signIn, signOut, setUser };
};



