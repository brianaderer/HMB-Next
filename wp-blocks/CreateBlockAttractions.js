import { gql } from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {Map} from "../components";

export default function CreateBlockAttractions(props) {
    const {renderedHtml} = props;
    const [locations, setLocations] = useState([]);
    const data = JSON.parse(renderedHtml);
    useEffect(() => {
        const newLocations = JSON.parse(renderedHtml).map(location => location);
        setLocations(newLocations);
    }, [renderedHtml]);
    return(
        <>
            <Map locations={locations} />
        {
            data?.map( (location, index ) =>{
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