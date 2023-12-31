import { gql } from '@apollo/client';
import React, {useEffect, useRef, useState} from 'react';
import {Text} from "../components";
import * as queries from '../queries/queryBlocks';

export default function CoreHeading(props) {
    const {attributes, customAttributes} = props;
    const {level, textAlign = 'left', style = {}} = attributes;
    const safeStyle = JSON.parse(style) ?? {};
    const {typography = {}} = safeStyle;
    const heading = useRef(null);
    const [paragraphHeading, setParagraphHeading] = useState(false);

    useEffect(() => {
        setParagraphHeading(heading.current.nextSibling.tagName === 'P');
    }, []);

    const alignLookup = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
    }

    return (
        <Text ref={heading} tag={`h${level}`} className={`text-xl pl-12 ${paragraphHeading ? `rounded-tl-3xl bg-neutral  p-4 pb-10 relative top-6` : ''} ${alignLookup[textAlign]}`}>{attributes.content}</Text>
    );
}

CoreHeading.fragments = {
    entry: gql`
    fragment CoreHeadingFragment on CoreHeading {
        ${queries.heading}
    }
  `,
    key: `CoreHeadingFragment`,
};

CoreHeading.displayName = 'CoreHeading';