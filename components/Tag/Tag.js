const Tag = props => {
    const {children} = props;
    return (
        <div className="badge badge-outline bg-secondary text-secondary-content p-3">{children}</div>
    )
}
export default Tag;