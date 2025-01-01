import { gql } from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {Carousel, HeroSlide, Review} from '../components';

export default function CreateBlockHeroSection(props) {
    const {content} = props;
    const [transitioning, setTransitioning] = useState(false);

    return(
        <>
            <div className="w-full bg-white rounded-box drop-shadow-md h-[60vh] lg:h-[75vh] xl:w-[125%] xl:translate-x-[-50%] xl:ml-[50%]">
                <Carousel setTransitioning={setTransitioning} showButtons={true} fullWidth={'noCrop'} scrollInterval={5000} className={`h-full`}>
                    {
                        content.map((slide, index) => {
                            return (
                                <HeroSlide key={index} {...slide} />
                            )
                        })
                    }
                </Carousel>
            </div>
        </>
            )
            }

            CreateBlockHeroSection.fragments = {
            entry: gql`
    fragment CreateBlockHeroSectionFragment on CreateBlockHeroSection {
        content {
            text {
                heading
                subheading
                body
            }
            cta {
                link
                target
                value
            }
            backgroundImage {
                caption
                alt
                description
                iD
                name
                src
                title
                type
            }
        }
    }
  `,
            key: `CreateBlockHeroSectionFragment`,
        };

            CreateBlockHeroSection.displayName = 'CreateBlockHeroSection';