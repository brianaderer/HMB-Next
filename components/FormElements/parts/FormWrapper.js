import React from "react";
import {Text, Login} from '../../../components';

const FormWrapper = props => {
    const {children, handleSubmit, prompt, anchor, className, login, loginMessage = 'Please Log In'} = props;
    return(
        <main {...(anchor?.length > 0 ? { id: anchor } : {})}  >
            {
                login ?
                <Login message={loginMessage}>
                    <form className={`flex flex-col px-2 lg:px-8 mb-4 ${className}`} onSubmit={handleSubmit}>
                        <Text tag={`h2`} className="font-bold mb-4">{prompt}</Text>
                        {children}
                    </form>
                </Login>
                    :
                <form className={`flex flex-col px-2 lg:px-8 mb-4 ${className}`} onSubmit={handleSubmit}>
                    <Text tag={`h2`} className="font-bold mb-4">{prompt}</Text>
                    {children}
                </form>
            }
        </main>
    );
}
export default FormWrapper;