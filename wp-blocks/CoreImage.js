import { gql } from '@apollo/client';
import React from 'react';
import {ContentWrapper} from "../components";

export default function CoreImage(props) {
    const {attributes, customAttributes} = props;
    console.log(customAttributes);
    console.log(attributes);
    return (
        <div className="aspect-video w-full h-auto overflow-clip">
            <img className={`min-w-full min-h-full`} src={attributes.src} alt={attributes.alt}/>
        </div>
    );
}

CoreImage.fragments = {
    entry: gql`
    fragment CoreImageFragment on CoreImage {
        anchor
        apiVersion
        customAttributes
        attributes {
          align
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
          caption
          borderColor
    }
    }
  `,
    key: `CoreImageFragment`,
};

CoreImage.displayName = 'CoreImage';