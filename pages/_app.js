import '../faust.config';
import React from 'react';
import { useRouter } from 'next/router';
import { FaustProvider } from '@faustwp/core';
import '@faustwp/core/dist/css/toolbar.css';
import '../styles/global.scss';
import { WordPressBlocksProvider } from '@faustwp/blocks';
import blocks from '../wp-blocks';
import {AuthContext} from "../contexts";
import {useFirebaseAuth} from "../utilities/auth";

export default function MyApp({ Component, pageProps }) {
  const { user, loading, signIn, signOut, setUser } = useFirebaseAuth();
  const router = useRouter();
  return (
      <FaustProvider pageProps={pageProps}>
          <AuthContext.Provider value={{user, setUser, signIn, signOut}}>
              <WordPressBlocksProvider
                  config={{
                      blocks,
                  }}>
                  <Component {...pageProps} key={router.asPath} />
              </WordPressBlocksProvider>
          </AuthContext.Provider>
      </FaustProvider>
  );
}
