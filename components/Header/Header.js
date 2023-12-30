import { useState } from 'react';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { Container, NavigationMenu, SkipNavigationLink } from '../../components';
import styles from './Header.module.scss';
import {Brand} from '../index';
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
    <header className={cx('component')}>
      <SkipNavigationLink />
        <Container>
          <div className={cx('navbar')}>
            <Brand description={description} title={title} logo={logo} />
            <button
              type="button"
              className={cx('nav-toggle')}
              onClick={() => setIsNavShown(!isNavShown)}
              aria-label="Toggle navigation"
              aria-controls={cx('primary-navigation')}
              aria-expanded={isNavShown}
            >
              ☰
            </button>
            <NavigationMenu
              className={cx(['primary-navigation', isNavShown ? 'show' : undefined])}
              menuItems={menuItems}
            />
        </div>
      </Container>
    </header>
  );
}
