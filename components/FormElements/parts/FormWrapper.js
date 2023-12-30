import React from "react";

const FormWrapper = props => {
    const {children, handleSubmit, prompt, anchor} = props;
    return(
        <main {...(anchor?.length > 0 ? { id: anchor } : {})}  >
            <form className="shadow-xl flex flex-col px-8 py-8 bg-white dark:bg-hmbBlue-300 drop-shadow-blueStandard" onSubmit={handleSubmit}>
                <h1 className="text-2xl font-bold dark:text-gray-50">{prompt}</h1>
                {children}
            </form>
        </main>
    );
}
export default FormWrapper;