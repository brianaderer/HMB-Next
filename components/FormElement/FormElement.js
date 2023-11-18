import React from 'react';
import * as Parts from './parts';
const FormElement = props => {
    const { type, label, slug, ...otherProps } = props;
    const ucType =
        type.charAt(0).toUpperCase()
        + type.slice(1)
    // Dynamically select the appropriate component from the Parts object
    const PartComponent = Parts[ucType];

    // Check if the PartComponent exists for the given type
    if (!PartComponent) {
        // Optionally handle the case where the type does not match any component
        console.error(`No component found for type: ${type}`);
        return null;
    }

    return (
        <div>
            <label htmlFor={slug}>{label}</label>
            <PartComponent id={slug} {...otherProps} />
        </div>
    );
};

export default FormElement;
