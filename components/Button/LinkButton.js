import React from "react";
import {useRouter} from "next/router";
const LinkButton = props => {
    const router = useRouter();
    const callback = props => {
        router.push(url).then(() => {});
    }
    const {classes = '', children, type='button', url} = props;
    return(
        <button type={type} className={`${classes} btn btn-outline`} onClick={callback}>
            {children}
        </button>
    )
}
export default LinkButton;