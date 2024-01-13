import {Text, Media} from "../../components";
import React from "react";

const ImageCard = props => {
    const {alt = '', src, caption, className='', onLoad = null, Button = null, TextArea = null, imageClassNames = ''} = props;

    return (
        <div className={`card bg-neutral text-neutral-content shadow-xl rounded-md border border-primary ${className}`} >
            {Button ? Button : ''}
            <figure className={`rounded-none`}>
                <Media.Image className={imageClassNames} alt={alt} onLoad={onLoad} src={src}/>
            </figure>
            <div className="card-body p-0">
                {caption ? <Text className={`text-sm`} tag={'p'}>{caption}</Text> : ''}
                {TextArea ? TextArea : ''}
            </div>
        </div>
    )
}
export default ImageCard;