const Category = props => {
    const {handler, category, index} = props;
    return (
        <div>
            <label>{category.name}</label>
            <input defaultChecked={true} type={'checkbox'} onChange={event => handler({bool: event.target.checked, category: index})} />
        </div>
    )
}
export default Category;