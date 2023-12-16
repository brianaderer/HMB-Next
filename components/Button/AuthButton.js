import React from "react";
import * as Paths from "../../paths";

const AuthButton = props => {
    const {callback, providerName, message} = props;
    return(
        <button className={`btn btn-outline`} onClick={() => callback({providerName: providerName})}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6`} viewBox="-3 0 262 262" preserveAspectRatio="xMidYMid" dangerouslySetInnerHTML={{ __html: Paths[providerName]}}></svg>{message}
        </button>
    )
}
export default AuthButton;