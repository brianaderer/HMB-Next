import Link from 'next/link';
const FooterMenuItem = props => {
    const {children, path} = props;
    return (
        <li>
            <Link className={'text-base-content/30'} href={path}>
                {children}
            </Link>
        </li>

    )
}
export default FooterMenuItem;