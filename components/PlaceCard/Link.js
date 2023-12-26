export const Link = props => {
    const {children, href} = props;
    return (
        <a rel="noopener noreferrer"  className={`m-2 mr-8 text-accent`} target={`_blank`} href={href}>{children}</a>
    )
}