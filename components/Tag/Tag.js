const Tag = props => {
    const {children} = props;
    return (
        <div className="badge badge-primary badge-outline ml-2 first:ml-0">{children}</div>
    )
}
export default Tag;