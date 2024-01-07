import { gql } from '@apollo/client';
import React from 'react';
import {Separator} from '../components';

export default function CoreSeparator(props) {
    const {attributes, customAttributes} = props;


    return (
        <Separator/>
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