import React from "react";
import {Text} from '../../../components';
import {Carousel} from "flowbite-react";

const Revolving = props => {
    const {tagline, galleryParagraph, imageGallery} = props;
    return (
        <>
            {tagline && <Text tag={'h1'} className={`text-center text-3xl mb-8`}>{tagline}</Text>}
            {galleryParagraph && <Text tag={'p'} className={`text-center text-xl`}>{galleryParagraph}</Text>}
            <div className="relative w-full my-8 ">
                <div className={`flex h-96 flex-row gap-4 w-[125%] mx-auto translate-x-[-50%] ml-[50%] drop-shadow-lg border-2 border-secondary/20 rounded-xl`}>
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