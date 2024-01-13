import React from "react";
import {Button} from '../../index';
import { GiSailboat } from "react-icons/gi";

const Submit = props => {
    const {buttonText} = props;
    return (
        <div className="flex flex-row items-center justify-start mt-4">
            <Button.StandardButton className={`mt-4`} type="submit">
                {buttonText}
                <GiSailboat className={`text-accent`} size={30} />
            </Button.StandardButton>
        </div>
    )
}
export default Submit;