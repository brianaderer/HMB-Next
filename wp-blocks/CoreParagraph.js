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
        setTimeout(() => {
            setIsFirst(paragraphRef.current.previousSibling.tagName !== 'P');
            setIsLast(paragraphRef.current.nextSibling.tagName !== 'P');
        }, 150);
    }, []);
    return (
        <Text ref={paragraphRef} tag={'p'} className={`bg-base-300/20 ${isFirst ? 'rounded-tl-3xl pt-6 lg:pt-8 border-t-4 border-t-base-100 z-10' : ''} ${isLast ? 'rounded-br-3xl pb-6 lg:pb-8 mb-4' : ''} px-6 xl:px-16 xl:indent-8 p-4 text-neutral-content drop-shadow-sm`}>{attributes?.content}</Text>
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
        content
      }
    }
  `,
    key: `CoreParagraphFragment`,
};

CoreParagraph.displayName = 'CoreParagraph';