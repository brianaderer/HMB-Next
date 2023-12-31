import classNames from 'classnames/bind';
import { Container, NavigationMenu } from '../../components';
import styles from './Footer.module.scss';

let cx = classNames.bind(styles);

export default function Footer({ title, menuItems }) {
  const year = new Date().getFullYear();

  return (
      <div className={`h-48 w-full`}></div>
    // <footer className={`${cx('component')} h-48 absolute w-full bottom-0`}>
    //   <Container>
    //     <NavigationMenu menuItems={menuItems} />
    //     <p className={cx('copyright')}>{`${title} © ${year}. Powered by WordPress.`}</p>
    //   </Container>
    // </footer>
  );
}
