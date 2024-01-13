import { gql } from '@apollo/client';
import React from 'react';
import {Separator, Text} from '../components';

export default function CoreList(props) {
    const {attributes, customAttributes} = props;
    const {values} = attributes;
    const extractListItems = (html) => {
        const regex = /<li>(.*?)<\/li>/g;
        const listItems = [];
        let match;

        while ((match = regex.exec(html)) !== null) {
            listItems.push(match[1]);
        }

        return listItems;
    };

    const listItemsArray = extractListItems(values);
    console.log(listItemsArray);


    return (
        <ul className={`rounded-tl-3xl pt-8 border-t-4 border-t-base-100 z-10 rounded-br-3xl pb-8 mb-4 px-16 indent-8 p-4 bg-neutral text-neutral-content drop-shadow-lg`}>
            {listItemsArray.map((item, index) => {
                return (<Text key={index} tagName={'li'}>{item}</Text>)
            })}
        </ul>
    );
}

CoreList.fragments = {
    entry: gql`
    fragment CoreListFragment on CoreList {
            anchor
            apiVersion
            attributes {
              values
              type
              textColor
              style
              start
              reversed
              placeholder
              ordered
              lock
              fontSize
              gradient
              fontFamily
              cssClassName
              className
              backgroundColor
              anchor
            }
          }
  `,
    key: `CoreListFragment`,
};

CoreList.displayName = 'CoreList';