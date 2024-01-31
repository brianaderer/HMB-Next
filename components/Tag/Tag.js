const Tag = props => {
    const {children} = props;
    return (
        <div className="badge badge-outline text-base-300 bg-primary p-3">{children}</div>
    )
}
export default Tag;