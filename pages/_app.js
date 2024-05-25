import '../faust.config';
import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import { FaustProvider } from '@faustwp/core';
import '@faustwp/core/dist/css/toolbar.css';
import '../styles/global.scss';
import { WordPressBlocksProvider } from '@faustwp/blocks';
import blocks from '../wp-blocks';
import {AuthContext, StickyContext, ScreenContext} from "../contexts";
import {Button, Modal, Text} from '../components';
import {useAuth} from "../utilities/auth";
import {useMediaQuery} from "../utilities/mediaQuery";

export default function MyApp({ Component, pageProps }) {
    const [screen, setScreen] = useState({});
    const [stickyExpanded, setStickyExpanded] = useState(true);
    const [offScreen, setOffScreen] = useState();
    const [stuck, setStuck] = useState(false);
    const [stickyHeight, setStickyHeight] = useState(0);


    useEffect(() => {
        const originalMatchMedia = window.matchMedia;
        window.matchMedia = (query) => {
            if (query === '(prefers-color-scheme: light)') {
                return {
                    matches: true,
                    media: query,
                    onchange: null,
                    addListener: () => {}, // Deprecated
                    removeListener: () => {}, // Deprecated
                    addEventListener: () => {},
                    removeEventListener: () => {},
                    dispatchEvent: () => {},
                };
            }
            return originalMatchMedia(query);
        };

        return () => {
            window.matchMedia = originalMatchMedia;
        };
    }, []);

    useMediaQuery({setScreen});

    useEffect(() => {
        const bodyChildDiv = document.body.querySelector('body > div#__next');
        // Add class to body
        document.documentElement.classList.add('scroll-smooth');
        // document.documentElement.setAttribute('data-theme', 'hmbLight');
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
                  <ScreenContext.Provider value={{stuck, setStuck, screen, offScreen, setOffScreen, stickyExpanded, setStickyExpanded, stickyHeight, setStickyHeight}}>
                      <WordPressBlocksProvider
                          config={{
                              blocks,
                          }}>
                          <Component {...pageProps} key={router.asPath} />
                          <Modal id={'signIn'}>
                              <div className="flex flex-col gap-10">
                                  <Text className={`text-center`} tag={`h2`}>Please Log In</Text>
                                  <div className={`w-full flex flex-row justify-evenly`}>
                                      <Button.AuthButton message={'Google'} providerName={'Google'} callback={() => handleSignIn({id: 'signUp', providerName: 'Google'})} />
                                      <Button.AuthButton message={'Facebook'} providerName={'Facebook'} callback={() => handleSignIn({id: 'signUp', providerName: 'Facebook'})} />
                                  </div>
                            </div>
                          </Modal>
                      </WordPressBlocksProvider>
                  </ScreenContext.Provider>
          </AuthContext.Provider>
      </FaustProvider>
  );
}
