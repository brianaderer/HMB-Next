const Category = props => {
    const {children, handler} = props;
    return (
        <div>
            <label>{children}</label>
            <input defaultChecked={true} type={'checkbox'} onChange={event => handler({bool: event.target.checked, category: children})} />
        </div>
    )
}
export default Category;