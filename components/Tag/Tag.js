const Tag = props => {
    const {children} = props;
    return (
        <div className="badge badge-outline text-base-300 bg-primary p-3 ml-2 first:ml-0">{children}</div>
    )
}
export default Tag;