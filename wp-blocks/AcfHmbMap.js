import { gql } from '@apollo/client';
import React from 'react';
import {Map, Text} from '../components'

export default function AcfHmbMap(props) {
    const { mapFields } = props;
    const {hmb_map, map_headline, map_description} = mapFields ? JSON.parse( mapFields ) : {};
    const location = {location: hmb_map, category_tax: []};
    const locations = [location];

    return (
        <div className={`bg-base-100 rounded-lg flex flex-row`}>
            <Map classes={'w-full drop-shadow-lg'} locations={locations || {}}/>
        </div>
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