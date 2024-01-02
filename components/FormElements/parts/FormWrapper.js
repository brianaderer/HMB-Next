import React from "react";

const FormWrapper = props => {
    const {children, handleSubmit, prompt, anchor} = props;
    return(
        <main {...(anchor?.length > 0 ? { id: anchor } : {})}  >
            <form className="flex flex-col px-8" onSubmit={handleSubmit}>
                <h1 className="text-2xl font-bold">{prompt}</h1>
                {children}
            </form>
        </main>
    );
}
export default FormWrapper;