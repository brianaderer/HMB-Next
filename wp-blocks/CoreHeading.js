import { gql } from '@apollo/client';
import React, {useEffect, useRef, useState} from 'react';
import {Text} from "../components";
import * as queries from '../queries/queryBlocks';

export default function CoreHeading(props) {
    const {attributes, renderedHtml} = props;
    const {level, textAlign = 'left', style = {}} = attributes;
    const safeStyle = JSON.parse(style) ?? {};
    const {typography = {}} = safeStyle;
    const heading = useRef(null);
    const [paragraphHeading, setParagraphHeading] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            const headingTag = heading.current?.nextSibling.tagName || 'P';
            setParagraphHeading( ['P', 'UL'].includes(headingTag));
        }, 150);
    }, []);

    const alignLookup = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
    }

    return (
        <Text ref={heading} tag={`h${level}`} className={`pl-12 bg-neutral drop-shadow-sm ${paragraphHeading ? `border-t border-r border-l border-accent/40 rounded-tl-3xl p-4 pb-10 relative top-6 -mt-6 bg-base-200/50 rounded-tr-md text-accent-content` : ''} ${alignLookup[textAlign]}`}>{renderedHtml}</Text>
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