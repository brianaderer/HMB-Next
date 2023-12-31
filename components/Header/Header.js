import classNames from 'classnames/bind';
import { Navbar, NavbarCollapse, NavbarLink, NavbarToggle } from 'flowbite-react';
import { Container, NavigationMenu, SkipNavigationLink } from '../../components';
import styles from './Header.module.scss';
import {Brand, Nav} from '../index';
let cx = classNames.bind(styles);
import { useState, useCallback, useEffect } from 'react';

export default function Header({
  title = 'Headless by WP Engine',
  description,
  menuItems,
  siteLogo,
  children,
}) {
  const [isNavShown, setIsNavShown] = useState(false);
  const useMediaQuery = (width) => {
    const [targetReached, setTargetReached] = useState(false);

    const updateTarget = useCallback((e) => {
      if (e.matches) {
        setTargetReached(true);
      } else {
        setTargetReached(false);
      }
    }, []);

    useEffect(() => {
      const media = window.matchMedia(`(max-width: ${width}px)`);
      media.addListener(updateTarget);

      // Check on mount (callback is not called until a change occurs)
      if (media.matches) {
        setTargetReached(true);
      }

      return () => media.removeListener(updateTarget);
    }, []);

    return targetReached;
  };
  console.log(useMediaQuery('768'));
  const {logo} = siteLogo;

  return (
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar bg-base-300">
            <div className="flex-none xl:hidden">
              <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              </label>
            </div>
            <Brand description={description} title={title} logo={logo} />
            <div className="flex-none hidden xl:block">
              <Nav.Top menuItems={menuItems} />
            </div>
          </div>
          {children}
        </div>
        <div className="xl:hidden drawer-side h-full">
          <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
          <Nav.Sidebar menuItems={menuItems} />
        </div>
      </div>
  );
}
