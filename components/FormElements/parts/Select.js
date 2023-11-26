const Select = props => {
    const{options} = props;
    return(
        <select>
            {
                Object.keys(options).map((option, index) => {
                    return(
                        <option value={option} key={index}>{options[option]}</option>
                    )
                })
            }
        </select>
    )
}
export default Select;