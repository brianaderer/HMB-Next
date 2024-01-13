import {Text, Media} from "../../components";
import React from "react";

const ImageCard = props => {
    const {alt = '', src, caption, classname='', onLoad = null, Button = null, TextArea = null, index = null} = props;

    return (
        <div className={`card bg-base-100 shadow-xl px-8 pt-8 rounded-md border border-primary ${classname}`} >
            {Button ? Button : ''}
            <figure className={`rounded-none`}>
                <Media.Image onLoad={onLoad} src={src}/>
            </figure>
            <div className="card-body">
                {caption ? <Text className={`text-sm`} tag={'p'}>{caption}</Text> : ''}
                {TextArea ? TextArea : ''}
            </div>
        </div>
    )
}
export default ImageCard;