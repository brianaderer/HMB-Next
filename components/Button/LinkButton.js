import React from "react";
import {useRouter} from "next/router";
import Link from 'next/link';
const LinkButton = props => {
    const {className = '', children, type='button', url} = props;
    return(
        <Link href={url}>
            <button type={'button'} className={`${className} btn lg:btn-md btn-outline btn-secondary`}>
                {children}
            </button>
        </Link>
    )
}
export default LinkButton;