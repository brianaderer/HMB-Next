import { gql } from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {Carousel, HeroSlide} from '../components';

export default function CreateBlockHeroSection(props) {
    const {content} = props;
    return(
        <div>
            <div className="w-full rounded-box p-2 lg:p-6 drop-shadow-md">
                    <Carousel fullWidth={'noCrop'} scrollInterval={7000} className={``}>
                        {content.map(slide => {
                            return (
                                <HeroSlide {...slide} />
                            )
                        })}
                    </Carousel>
                </div>
            </div>
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