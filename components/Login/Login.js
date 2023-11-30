const Login = props => {
    const {children} = props;
    return (
        <div>
            <h3>Please Log In to Write in our Guest Book</h3>
            {children}
        </div>
    )
}
export default Login;