import { gql } from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {Galleries} from "../components";

export default function CreateBlockInstagramGallery(props) {
    const {renderedHtml} = props;
    const [posts, setPosts] = useState({});


    useEffect(() => {
        const data = JSON.parse(renderedHtml);
        setPosts( data.posts );
    }, [renderedHtml]);

    return(
        <>
            {
               Object.keys(posts).length > 0 ? <Galleries.MasonryComponent spacing={4} cols={3} increment={9} posts={posts} srcName={'media_url'} captionName={'caption'}/> : ''
            }
        </>
    )
}

CreateBlockInstagramGallery.fragments = {
    entry: gql`
    fragment CreateBlockInstagramGalleryFragment on CreateBlockInstagramGallery {
      renderedHtml
    }
  `,
    key: `CreateBlockInstagramGalleryFragment`,
};

CreateBlockInstagramGallery.displayName = 'CreateBlockInstagramGallery';