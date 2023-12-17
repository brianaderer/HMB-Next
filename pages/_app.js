import '../faust.config';
import React from 'react';
import { useRouter } from 'next/router';
import { FaustProvider } from '@faustwp/core';
import '@faustwp/core/dist/css/toolbar.css';
import '../styles/global.scss';
import { WordPressBlocksProvider } from '@faustwp/blocks';
import blocks from '../wp-blocks';
import {AuthContext} from "../contexts";
import {Button} from '../components';
import {useAuth} from "../utilities/auth";

export default function MyApp({ Component, pageProps }) {

  const { user, loading, signIn, signOut, setUser } = useAuth();
    const handleSignIn = props => {
        const {id, providerName} = props;
        signIn({setUser, providerName, id});
    };
    const handleSignOut = () => {
        signOut({setUser});
    };

    const promptSignIn = () => {
        console.log('sign that fucker in');
    }
  const router = useRouter();
  return (
      <FaustProvider pageProps={pageProps}>
          <AuthContext.Provider value={{user, setUser, signIn, signOut, promptSignIn, handleSignIn, handleSignOut}}>
              <WordPressBlocksProvider
                  config={{
                      blocks,
                  }}>
                  <Component {...pageProps} key={router.asPath} />
                  <div>
                      <Button.AuthButton message={'Google'} providerName={'Google'} callback={() => handleSignIn({id: 'signUp', providerName: 'Google'})} />
                      <Button.AuthButton message={'Facebook'} providerName={'Facebook'} callback={() => handleSignIn({id: 'signUp', providerName: 'Facebook'})} />
                  </div>
              </WordPressBlocksProvider>
          </AuthContext.Provider>
      </FaustProvider>
  );
}
