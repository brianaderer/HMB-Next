import React from "react";

const Static = props => {
    const {className = '', background = false, oversize = true, tagline= '', galleryParagraph= '', imageGallery} = props;
    return (
        <>
            {tagline && <h1 className={`text-center text-3xl mb-8`}>{tagline}</h1>}
            {galleryParagraph && <p className={`text-center text-xl`}>{galleryParagraph}</p>}
            <div className={`relative w-full my-8 mx-auto ${className}`}>
                <div className={`flex flex-row gap-4 ${oversize ? `w-[110%] translate-x-[-50%] ml-[50%] ` : ''} items-stretch mx-auto ${background ? `bg-neutral border-2 border-secondary/20` : ''} rounded-lg drop-shadow-lg p-8`}>

                    {
                        Object.keys(imageGallery).map( index => {
                            const image = imageGallery[index];
                            const {alt, url, caption = ''} = image;
                            return(
                                <div key={index} className={`shrink grow w-auto basis-0 drop-shadow-lg`}>
                                    <img className={`w-full h-full object-cover`} src={url} alt={alt}/>
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