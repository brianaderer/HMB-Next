import styles from './Container.module.scss';
import className from 'classnames/bind';

let cx = className.bind(styles);

export default function Container({ children, className }) {
  return (
    <div className={`overflow-clip bg-base-100 m-auto w-2/3 drop-shadow-lg mb-4 rounded-b-2xl px-6 py-10`}>
      {children}
    </div>
  );
}
