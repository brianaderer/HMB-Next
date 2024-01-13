import {ImageCard} from "../../ImageCard";
import {LoadMore} from "../../LoadMore";
import React, {useState} from "react";
import {Masonry as MUIMasonry} from '@mui/lab'

const Masonry = props => {
    const {posts, srcName, captionName, increment, cols, spacing} = props;
    const [limit, setLimit] = useState(increment);
    return (
        <>
            <MUIMasonry columns={cols} spacing={spacing}>
                <>
                    {Object.keys(posts).map((post,index) => {
                        if( index < limit ){
                            const src = posts[post][srcName];
                            const caption = posts[post][captionName];
                            return(
                                <ImageCard key={index} src={src} caption={caption} />
                            )
                        }
                    })}
                </>
            </MUIMasonry>
            <LoadMore max={Object.keys(posts).length} setLimit={setLimit} limit={limit} increment={increment} />
        </>
    )
}
export default Masonry;