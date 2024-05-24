import React from "react";
import {Button} from '../../index';
import { GiSailboat } from "react-icons/gi";

const Submit = props => {
    const {buttonText, callback} = props;
    return (
        <div className="flex flex-row items-center justify-start mt-4 text-accent-content hover:text-secondary-content">
            <Button.StandardButton callback={callback} className={`mt-4`} type="submit">
                {buttonText}
                <GiSailboat className={``} size={30} />
            </Button.StandardButton>
        </div>
    )
}
export default Submit;