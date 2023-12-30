import { useState } from 'react';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { Navbar, NavbarCollapse, NavbarLink, NavbarToggle } from 'flowbite-react';
import { Container, NavigationMenu, SkipNavigationLink } from '../../components';
import styles from './Header.module.scss';
import {Brand, Nav} from '../index';
let cx = classNames.bind(styles);

export default function Header({
  title = 'Headless by WP Engine',
  description,
  menuItems,
  siteLogo
}) {
  const [isNavShown, setIsNavShown] = useState(false);
  const {logo} = siteLogo;

  return (
      <div className={`min-h-28 bg-hmbBlue-100 flex w-full items-end flex-row pr-[5%] pb-2`}>
      <Navbar className={`bg-transparent w-full`} fluid>
        <Brand description={description} menuItems={menuItems} logo={logo} title={title} />
        <NavbarToggle />
        <NavbarCollapse>
          <Nav menuItems={menuItems} />
        </NavbarCollapse>
      </Navbar>
      </div>
  );
}
