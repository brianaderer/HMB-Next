import {ImageCard} from "../../ImageCard";
import {LoadMore} from "../../LoadMore";
import React, {useState, useContext} from "react";
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import {ScreenContext} from "../../../contexts";


const MasonryComponent = props => {
    const {screen, offScreen, setOffScreen} = useContext(ScreenContext);
    const isMobile = !screen?.breakpoints?.includes('md');
    const {posts, srcName, captionName, increment, imgSize = 'default', spacing} = props;
    const computedIncrement = isMobile ? 7 : increment;
    const [limit, setLimit] = useState(computedIncrement);
    const computedSpacing = isMobile ? 10 : spacing * 10;
    const [loaded, setLoaded] = useState([]);
    const onLoad = props => {
        const {id} = props;
        setTimeout(() => {
            setLoaded( prevLoaded => [...prevLoaded, id] )
        }, 100 )
    }
    const sizeLookup = {
        small: {350: 2, 750: 3, 900: 4},
        default: {350: 1, 750: 2, 900: 3},
    }
    return (
        <div className={`mb-2`}>
            <ResponsiveMasonry
                columnsCountBreakPoints={sizeLookup[imgSize]}
            >
                <Masonry
                    gutter={0}
                >
                    {Object.keys(posts).map((post,index) => {
                        if( index < limit ){
                            const src = posts[post][srcName];
                            const caption = posts[post][captionName];
                            return(
                                <ImageCard loaded={loaded.includes(index)} onLoad={() => onLoad({id : index})} className={`p-2 md:p-4 transition-all rounded-none`} imageClassName={`mb-2 md:mb-4`} key={index} src={src} caption={caption} />
                            )
                        }
                    })}
                </Masonry>
            </ResponsiveMasonry>
            <LoadMore max={Object.keys(posts).length} setLimit={setLimit} limit={limit} increment={computedIncrement} className={`mt-6`} />
        </div>
    )
}
export default MasonryComponent;