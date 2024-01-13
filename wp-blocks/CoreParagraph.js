import { gql } from '@apollo/client';
import React, {useEffect, useRef, useState} from 'react';
import {Text} from "../components";
import * as queries from '../queries/queryBlocks'

export default function CoreParagraph(props) {
    const [isFirst, setIsFirst] = useState(false);
    const [isLast, setIsLast] = useState(false);
    const {attributes, customAttributes, clientId} = props;
    const paragraphRef = useRef(null);
    useEffect(() => {
        setIsFirst(paragraphRef.current.previousSibling?.tagName !== 'P');
        setIsLast(paragraphRef.current.nextSibling?.tagName !== 'P');
    }, []);
    return (
        <Text ref={paragraphRef} tag={'p'} className={`${isFirst ? 'rounded-tl-3xl pt-8 border-t-4 border-t-base-100 z-10' : ''} ${isLast ? 'rounded-br-3xl pb-8 mb-4' : ''} px-16 indent-8 p-4 bg-neutral text-neutral-content drop-shadow-lg`}>{attributes?.content}</Text>
    );
}

CoreParagraph.fragments = {
    entry: gql`
    fragment CoreParagraphFragment on CoreParagraph {
    customAttributes
    clientId
      attributes {
        backgroundColor
        style
        textColor
        fontSize
        fontFamily
        dropCap
        gradient
        align
        content
      }
    }
  `,
    key: `CoreParagraphFragment`,
};

CoreParagraph.displayName = 'CoreParagraph';