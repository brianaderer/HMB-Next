import { gql } from '@apollo/client';
import React from 'react';
import {ContentWrapper} from "../components";

export default function CoreImage(props) {
    const {attributes, customAttributes} = props;
    return (
        <div
            className="rounded-lg aspect-video w-full bg-cover bg-center"
            style={{backgroundImage: `url(${attributes.src})`}}
            aria-label={attributes.alt}
        />
    );
}

CoreImage.fragments = {
    entry: gql`
        fragment CoreImageFragment on CoreImage {
            anchor
            apiVersion
            customAttributes
            attributes {
          alt
          anchor
          aspectRatio
          width
          url
          title
          style
          sizeSlug
          src
          scale
          rel
          lock
          linkTarget
          linkDestination
          linkClass
          lightbox
          id
          href
          height
          cssClassName
          className
          borderColor
    }
    }
  `,
    key: `CoreImageFragment`,
};

CoreImage.displayName = 'CoreImage';