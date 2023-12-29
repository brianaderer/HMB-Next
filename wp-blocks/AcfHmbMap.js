import { gql } from '@apollo/client';
import React from 'react';
import {Map, Text} from '../components'

export default function AcfHmbMap(props) {
    const { mapFields } = props;
    const {hmb_map, map_headline, map_description} = mapFields ? JSON.parse( mapFields ) : {};
    const location = {location: hmb_map, category_tax: []};
    const locations = [location];

    return (
        <>
            {map_headline && <Text className={`text-2xl text-center mb-4`} tag={'h3'}>{map_headline}</Text>}
            <Map locations={locations}/>
            {map_description && <Text className={`text-lg text-center mt-12`} tag={'p'}>{map_description}</Text>}
        </>
    );
}

AcfHmbMap.fragments = {
    entry: gql`
    fragment AcfHmbMapFragment on AcfHmbMap {
        mapFields
    }
  `,
    key: `AcfHmbMapFragment`,
};

AcfHmbMap.displayName = 'AcfHmbMap';