import React from "react";
import {Text} from '../../../components';

const Message = props => {
    const {slug, handler, classes, value, title, required, message} = props;
    const {labelClasses, inputClasses, spanClasses} = classes;
    return(
        <Text tag={`p`} className={`${labelClasses} px-12 mb-4 text-lg`}>
            {message}
        </Text>
    )
}
export default Message;