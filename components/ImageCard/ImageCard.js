import {Text, Media} from "../../components";
import React from "react";

const ImageCard = props => {
    const {loaded = true, alt = '', src, caption, className='', onLoad = null, Button = null, TextArea = null, imageClassName = ''} = props;
    return (
        <div className={`transition-all ${loaded ? `opacity-100` : `opacity-0 !h-0`} card bg-neutral text-neutral-content shadow-xl rounded-md border border-primary ${className}`} >
            {Button ? Button : ''}
            <figure className={`rounded-none`}>
                <Media.Image className={imageClassName} alt={alt} onLoad={onLoad} src={src}/>
            </figure>
            <div className="card-body p-0">
                {caption ? <Text className={`text-sm`} tag={'p'}>{caption}</Text> : ''}
                {TextArea ? TextArea : ''}
            </div>
        </div>
    )
}
export default ImageCard;