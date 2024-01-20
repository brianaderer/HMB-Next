import { gql } from '@apollo/client';
import React from 'react';
import { Galleries } from '../components';

export default function AcfGallery(props) {
    const { galleryFields } = props;
    const gallery = galleryFields ? JSON.parse( galleryFields ) : {};
    const { imageGallery, galleryType = 'static' } = gallery;
    const type = galleryType.charAt(0).toUpperCase() +  galleryType.slice(1);
    const Gallery = Galleries[type];
    return (
        <Gallery background={true} imageGallery={imageGallery} />
    );
}

AcfGallery.fragments = {
    entry: gql`
    fragment AcfGalleryFragment on AcfGallery {
        galleryFields
    }
  `,
    key: `AcfGalleryFragment`,
};

AcfGallery.displayName = 'AcfGallery';