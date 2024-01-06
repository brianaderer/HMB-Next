import { gql } from '@apollo/client';
import React from 'react';
import {Map, Text} from '../components'

export default function AcfHmbMap(props) {
    const { mapFields } = props;
    const {hmb_map, map_headline, map_description} = mapFields ? JSON.parse( mapFields ) : {};
    const location = {location: hmb_map, category_tax: []};
    const locations = [location];

    return (
        <div className={`p-8 mb-8 bg-base-100 rounded-lg flex flex-row gap-4`}>
            <Map classes={'w-1/2 drop-shadow-lg mb-8'} locations={locations || {}}/>
            <div className="w-1/2 flex flex-col justify-center p-8">
                {map_headline && <Text className={`text-2xl text-center mb-4`} tag={'h3'}>{map_headline}</Text>}
                {map_description && <div dangerouslySetInnerHTML={{__html:map_description}} className={`text-lg mt-12`}/>}

            </div>
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