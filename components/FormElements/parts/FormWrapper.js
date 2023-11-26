import React from "react";

const FormWrapper = props => {
    const {children, handleSubmit, prompt} = props;
    return(
        <main>
            <form className="rounded-lg shadow-xl flex flex-col px-8 py-8 bg-white dark:bg-hmbBlue-300 drop-shadow-blueStandard" onSubmit={handleSubmit}>
                <h1 className="text-2xl font-bold dark:text-gray-50">{prompt}</h1>
                {children}
            </form>
        </main>
    );
}
export default FormWrapper;