import { gql } from '@apollo/client';
import React from 'react';

export default function AcfGallery(props) {
    const { galleryFields } = props;
    const gallery = galleryFields ? JSON.parse( galleryFields ) : {};
    const { imageGallery, tagline, galleryParagraph } = gallery;
    return (
        <>
            <h1 className={`text-center text-3xl mb-8`}>{tagline}</h1>
            <p className={`text-center text-xl`}>{galleryParagraph}</p>
            <div className="relative w-full mb-12 border-b-2 border-hmbBlue pb-12">
                <div className={`flex flex-row gap-4 w-[125%] items-stretch mx-auto translate-x-[-50%] ml-[50%]`}>

                    {
                        Object.keys(imageGallery).map( index => {
                            const image = imageGallery[index];
                            return(
                                <div key={index} className={`shrink grow w-auto basis-0`}>
                                    <img className={`w-full h-full object-cover`} src={image.url} alt={image.alt}/>
                                </div>
                                    )
                        } )
                    }
                </div>
            </div>
        </>
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