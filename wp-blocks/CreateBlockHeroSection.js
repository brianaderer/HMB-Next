import { gql } from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {Carousel, HeroSlide, Review} from '../components';

export default function CreateBlockHeroSection(props) {
    const {content} = props;
    const [transitioning, setTransitioning] = useState(false);

    return(
        <>
            <div className="w-full bg-white rounded-box drop-shadow-md h-[75vh] lg:w-[125%] lg:translate-x-[-50%] lg:ml-[50%]">
                <Carousel setTransitioning={setTransitioning} showButtons={true} fullWidth={'noCrop'} scrollInterval={5000} className={`h-[75vh] w-full`}>
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