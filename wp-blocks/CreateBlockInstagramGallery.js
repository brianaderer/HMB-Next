import { gql } from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {Media, Text} from "../components";
import {Masonry} from '@mui/lab';



export default function CreateBlockInstagramGallery(props) {
    const {renderedHtml} = props;
    const [posts, setPosts] = useState([]);
    const [key, setKey] = useState('');
    useEffect(() => {
        const data = JSON.parse(renderedHtml);
        setPosts( data.posts );
    }, [renderedHtml]);
    const limit = 12;

    return(
        <Masonry columns={4} spacing={2}>
            <>
            {Object.keys(posts).map((post,index) => {
                if( index < limit ){
                    return(
                        <div key={index}>
                            {posts[post]?.media_type}
                            <Media.Image src={posts[post]?.media_url}/>
                            <Text className={`text-sm`} tag={'p'}>{posts[post]?.caption}</Text>
                        </div>
                    )
                }
            })}
            </>
        </Masonry>
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