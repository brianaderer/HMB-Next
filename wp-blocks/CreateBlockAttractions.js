import { gql } from '@apollo/client';
import React from 'react';
import {ContentWrapper, FormElement} from "../components";

export default function CreateBlockAttractions(props) {
    const {renderedHtml} = props;
    const data = JSON.parse( renderedHtml );
    return(
        <>
        {
            data.map( (location, index ) =>{
                return(<h1 key={index}>{location.title}</h1>)
            } )
        }
        </>
    )
}

CreateBlockAttractions.fragments = {
    entry: gql`
    fragment CreateBlockAttractionsFragment on CreateBlockAttractions {
      renderedHtml
    }
  `,
    key: `CreateBlockAttractionsFragment`,
};

CreateBlockAttractions.displayName = 'CreateBlockAttractions';