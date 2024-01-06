import React from "react";

const Static = props => {
    const {tagline, galleryParagraph, imageGallery} = props;
    return (
        <>
            {tagline && <h1 className={`text-center text-3xl mb-8`}>{tagline}</h1>}
            {galleryParagraph && <p className={`text-center text-xl`}>{galleryParagraph}</p>}
            <div className="relative w-full my-8 pb-12">
                <div className={`flex flex-row gap-4 w-[110%] items-stretch mx-auto translate-x-[-50%] ml-[50%] bg-neutral rounded-lg drop-shadow-lg p-4`}>

                    {
                        Object.keys(imageGallery).map( index => {
                            const image = imageGallery[index];
                            return(
                                <div key={index} className={`shrink grow w-auto basis-0 drop-shadow-lg`}>
                                    <img className={`w-full h-full object-cover`} src={image.url} alt={image.alt}/>
                                </div>
                            )
                        } )
                    }
                </div>
            </div>
        </>
    )
}
export default Static;