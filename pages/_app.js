import '../faust.config';
import React, {useEffect} from 'react';
import { useRouter } from 'next/router';
import { FaustProvider } from '@faustwp/core';
import '@faustwp/core/dist/css/toolbar.css';
import '../styles/global.scss';
import { WordPressBlocksProvider } from '@faustwp/blocks';
import blocks from '../wp-blocks';
import {AuthContext} from "../contexts";
import {Button, Modal} from '../components';
import {useAuth} from "../utilities/auth";

export default function MyApp({ Component, pageProps }) {
    useEffect(() => {
        const bodyChildDiv = document.body.querySelector('body > div#__next');
        // Add class to body
        document.documentElement.classList.add('scroll-smooth');
        document.documentElement.setAttribute('data-theme', 'dark');
        document.body.classList.add('min-h-screen','bg-base-200');
        const divClasses = 'min-h-screen relative';
        const classList = divClasses.split(' '); // Splitting the string into an array of classes
        bodyChildDiv.classList.add(...classList); // Using the spread operator to pass individual classes


        // Cleanup function to remove class from body
        return () => {
            document.body.classList.remove('min-h-screen');
            bodyChildDiv.classList.remove(...classList);
        };
    }, []);

  const { user, loading, signIn, signOut, setUser, dbUser, setDbUser, checkUser, updateUserDb } = useAuth();
    const handleSignIn = props => {
        const {id, providerName} = props;
        signIn({setUser, providerName, id}).then(() => {
            document.getElementById('signIn').close();
        });
    };
    const handleSignOut = () => {
        signOut({setUser}).then(() => {
            console.log('user logged out');
        });
    };

    const promptSignIn = () => {
        document.getElementById('signIn').showModal();
    }

  const router = useRouter();
  return (
      <FaustProvider pageProps={pageProps}>
          <AuthContext.Provider value={{user, setUser, signIn, signOut, promptSignIn, handleSignIn, handleSignOut, dbUser, setDbUser, checkUser, updateUserDb}}>
              <WordPressBlocksProvider
                  config={{
                      blocks,
                  }}>
                  <Component {...pageProps} key={router.asPath} />
                  <Modal id={'signIn'}>
                      <div>
                          <Button.AuthButton message={'Google'} providerName={'Google'} callback={() => handleSignIn({id: 'signUp', providerName: 'Google'})} />
                          <Button.AuthButton message={'Facebook'} providerName={'Facebook'} callback={() => handleSignIn({id: 'signUp', providerName: 'Facebook'})} />
                      </div>
                  </Modal>
              </WordPressBlocksProvider>
          </AuthContext.Provider>
      </FaustProvider>
  );
}
