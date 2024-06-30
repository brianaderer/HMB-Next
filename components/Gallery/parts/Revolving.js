import React, { useState, useEffect, useRef } from "react";
import { Text, Carousel } from '../../../components';

const Revolving = props => {
    const { tagline, galleryParagraph, imageGallery } = props;
    const totalWidth = useRef(0);
    const carouselWidth = useRef(0);
    const carouselRef = useRef(null);
    const imagesRef = useRef([]);
    const [galleryActive, setGalleryActive] = useState(false);

    useEffect(() => {
        const calculateTotalWidth = () => {
            let total = 0;
            imagesRef.current.forEach(img => {
                if (img) {
                    total += img.getBoundingClientRect().width;
                }
            });
            totalWidth.current = total;
        };

        if (carouselRef.current) {
            console.log(carouselWidth);
            console.log(totalWidth);
            carouselWidth.current = carouselRef.current.getBoundingClientRect().width;
            calculateTotalWidth();
            setGalleryActive(totalWidth.current > carouselWidth.current);
        }
    }, [imageGallery, carouselRef, totalWidth, carouselWidth]);

    return (
        <div>
            {tagline && <Text tag={'h1'} className={`text-center text-3xl mb-8`}>{tagline}</Text>}
            {galleryParagraph && <Text tag={'p'} className={`text-center text-xl`}>{galleryParagraph}</Text>}
            <div className="relative my-8 ">
                <div ref={carouselRef} className={`flex flex-row gap-4 ${galleryActive ? `xl:w-[125%] xl:translate-x-[-50%] xl:ml-[50%]` : `w-fit`} mx-auto drop-shadow-lg border-2 border-secondary/20 rounded-xl`}>
                    <Carousel active={galleryActive}>
                        {Object.keys(imageGallery).map((index, idx) => {
                            const image = imageGallery[index];
                            return (
                                <img
                                    key={index}
                                    ref={el => imagesRef.current[idx] = el}
                                    className={``}
                                    src={image.url}
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
