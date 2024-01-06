import React from "react";
import {Carousel} from "flowbite-react";

const Revolving = props => {
    const {tagline, galleryParagraph, imageGallery} = props;
    return (
        <>
            {tagline && <h1 className={`text-center text-3xl mb-8`}>{tagline}</h1>}
            {galleryParagraph && <p className={`text-center text-xl`}>{galleryParagraph}</p>}
            <div className="relative w-full my-8 pb-12">
                <div className={`flex h-96 flex-row gap-4 w-[125%] mx-auto translate-x-[-50%] ml-[50%] drop-shadow-lg`}>
                    <Carousel>
                    {
                        Object.keys(imageGallery).map( index => {
                            const image = imageGallery[index];
                            return(
                                <img key={index} className={`w-full h-full object-cover`} src={image.url} alt={image.alt}/>
                            )
                        } )
                    }
                    </Carousel>
                </div>
            </div>
        </>
    )
}
export default Revolving;