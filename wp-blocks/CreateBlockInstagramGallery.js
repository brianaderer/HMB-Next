import { gql } from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {Media, Text, LoadMore} from "../components";
import {Masonry} from '@mui/lab';



export default function CreateBlockInstagramGallery(props) {
    const increment = 8;
    const {renderedHtml} = props;
    const [posts, setPosts] = useState([]);
    const [limit, setLimit] = useState(increment);

    useEffect(() => {
        const data = JSON.parse(renderedHtml);
        setPosts( data.posts );
    }, [renderedHtml]);

    return(
        <>
        <Masonry columns={4} spacing={2}>
            <>
            {Object.keys(posts).map((post,index) => {
                if( index < limit ){
                    return(
                        <div className={`card bg-base-100 shadow-xl rounded-none p-2 border border-primary`} key={index}>
                            <figure>
                                <Media.Image src={posts[post]?.media_url}/>
                            </figure>
                            <div className="card-body">
                                <Text className={`text-sm`} tag={'p'}>{posts[post]?.caption}</Text>
                            </div>
                        </div>
                    )
                }
            })}
            </>
        </Masonry>
    <LoadMore max={Object.keys(posts).length} setLimit={setLimit} limit={limit} increment={increment} />
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