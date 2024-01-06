import { gql } from '@apollo/client';
import React from 'react';

export default function CoreSeparator(props) {
    const {attributes, customAttributes} = props;


    return (
        <div className={`h-px rounded-lg w-full bg-primary mb-8 drop-shadow-lg`}></div>
    );
}

CoreSeparator.fragments = {
    entry: gql`
    fragment CoreSeparatorFragment on CoreSeparator {
      attributes {
        align
        anchor
        opacity
        gradient
        backgroundColor
        style
        cssClassName
      }
    }
  `,
    key: `CoreSeparatorFragment`,
};

CoreSeparator.displayName = 'CoreSeparator';