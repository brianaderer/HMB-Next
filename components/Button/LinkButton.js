import React from "react";
import {useRouter} from "next/router";
import Link from 'next/link';
const LinkButton = props => {
    const {classes = '', children, type='button', url} = props;
    return(
        <Link href={url}>
            <button type={'button'} className={`${classes} btn btn-outline btn-secondary`}>
                {children}
            </button>
        </Link>
    )
}
export default LinkButton;