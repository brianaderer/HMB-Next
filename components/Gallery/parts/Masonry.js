import {ImageCard} from "../../ImageCard";
import {LoadMore} from "../../LoadMore";
import React, {useState, useContext} from "react";
import {Masonry as MUIMasonry} from '@mui/lab';
import {ScreenContext} from "../../../contexts";


const Masonry = props => {
    const screen = useContext(ScreenContext);
    const isMobile = !screen.breakpoints.includes('md');
    const {posts, srcName, captionName, increment, cols, spacing} = props;
    const computedCols = isMobile ? 1 : cols;
    const computedIncrement = isMobile ? 4 : increment;
    const [limit, setLimit] = useState(computedIncrement);
    const computedSpacing = isMobile ? 2 : spacing;

    return (
        <>
            <MUIMasonry columns={computedCols} spacing={computedSpacing}>
                <>
                    {Object.keys(posts).map((post,index) => {
                        if( index < limit ){
                            const src = posts[post][srcName];
                            const caption = posts[post][captionName];
                            return(
                                <ImageCard className={`p-2 md:p-4`} imageClassName={`mb-2 md:mb-4`} key={index} src={src} caption={caption} />
                            )
                        }
                    })}
                </>
            </MUIMasonry>
            <LoadMore max={Object.keys(posts).length} setLimit={setLimit} limit={limit} increment={computedIncrement} />
        </>
    )
}
export default Masonry;