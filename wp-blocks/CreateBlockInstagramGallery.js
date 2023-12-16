import { gql } from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {Media} from "../components";


export default function CreateBlockInstagramGallery(props) {
    const {renderedHtml} = props;
    const [posts, setPosts] = useState([]);
    const [key, setKey] = useState('');
    useEffect(() => {
        const data = JSON.parse(renderedHtml);
        setPosts( data.posts );
    }, [renderedHtml]);
    const limit = 8;

    return(
        <>
            {Object.keys(posts).map((post,index) => {
                if( index < limit ){
                    return(
                        <div key={index}>
                            {posts[post]?.media_type}
                            <Media.Image src={posts[post]?.media_url}/>
                            {posts[post]?.caption}
                        </div>
                    )
                }
            })}
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