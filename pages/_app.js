import '../faust.config';
import React, {useState} from 'react';
import { useRouter } from 'next/router';
import { FaustProvider } from '@faustwp/core';
import '@faustwp/core/dist/css/toolbar.css';
import '../styles/global.scss';
import { WordPressBlocksProvider } from '@faustwp/blocks';
import blocks from '../wp-blocks';
import {AuthContext} from "../contexts";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [auth, setAuth] = useState(false);

  return (
      <FaustProvider pageProps={pageProps}>
          <AuthContext.Provider value={auth}>
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
