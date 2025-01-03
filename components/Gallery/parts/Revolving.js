import React, {useState, useRef, useEffect} from "react";
import { Text, Carousel } from '../../../components';
import {useRouter} from "next/router";

const Revolving = props => {
    const { tagline, galleryParagraph, imageGallery, srcName='url', captionName } = props;
    const totalWidth = useRef(0);
    const carouselWidth = useRef(0);
    const carouselRef = useRef(null);
    const imagesRef = useRef([]);
    const [galleryActive, setGalleryActive] = useState(true);
    const [dynamicWidth, setDynamicWidth] = useState(null);
    const router = useRouter(); // Access router object

    useEffect(() => {
        setTimeout(() => {
            if (imagesRef.current.length > 0) {
                totalWidth.current = imagesRef.current.reduce((total, img) => {
                    return total + (img?.offsetWidth || 0);
                }, 0);
                setDynamicWidth(totalWidth.current);
            }
        }, 300);
    }, [imageGallery]);


    return (
        <div>
            {tagline && <Text tag={'h1'} className={`text-center text-3xl mb-8`}>{tagline}</Text>}
            {galleryParagraph && <Text tag={'p'} className={`text-center text-xl`}>{galleryParagraph}</Text>}
            <div className="relative my-8 ">
                <div ref={carouselRef} style={{ width: dynamicWidth !== null ? dynamicWidth : 'auto' }} className={`imageGallery flex flex-row gap-4 max-w-full ${galleryActive ? `xl:max-w-[125%] xl:translate-x-[-50%] xl:ml-[50%]` : `w-fit max-w-[100%]`} mx-auto drop-shadow-md border-2 border-secondary/20 rounded-2xl`}>
                    <Carousel active={galleryActive}>
                        {Object.keys(imageGallery).map((index, idx) => {
                            const image = imageGallery[index];
                            return (
                                <img
                                    key={idx}
                                    ref={(el) => (imagesRef.current[idx] = el)}
                                    className={`h-full`}
                                    src={image[srcName]}
                                    alt={image.alt}
                                />
                            );
                        })}
                    </Carousel>
                </div>
            </div>
        </div>
    );
};

export default Revolving;
