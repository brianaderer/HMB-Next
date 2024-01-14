import {Text, Button, ImageCard} from '../../../components'
import React, {useEffect, useState} from 'react';
import {Textarea} from './index';
import {useDropzone} from "react-dropzone";
import {Masonry} from '@mui/lab';
const Gallery = props => {
    const {slug, classes, title, setState, state, required, message} = props
    const {labelClasses, inputClasses, spanClasses} = classes;
    const handleTyping = ({value, index}) => {
        const caption = value;
        const newFiles = [...state];
        Object.assign(newFiles[index], {
            caption: caption,
        });
        setState(newFiles);
    }
    const removeImage = ({index}) => {
        const newFiles = state.filter((elem, key) => (key !== index) );
        setState(newFiles);
    }
    const {getRootProps, getInputProps} = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop: acceptedFiles => {
            setState([...acceptedFiles, ...state]);
        }
    });

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => state.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);

    const loadHandler = ({file}) => {
        URL.revokeObjectURL(file.preview)
    }

    const thumbs = state.map((file, index) => {
        Object.assign(file, {
            preview: (URL.createObjectURL(file)),
        })
        const alt = file.name;
        const src = file.preview;
        return (
            <ImageCard key={index}
                       className={`w-1/4 p-4`}
                       onLoad = {() => loadHandler({file})}
                       alt={alt}
                       src={src}
                       Button={<Button.StandardButton className={`w-fit mb-2 p-2 h-fit min-h-0`} callback={() => removeImage({index})}>X</Button.StandardButton>}
                       TextArea={<Textarea rows={4} index={index} value={state[index].caption || ''} classes={classes} handler={handleTyping} placeholder={'Give your image a caption!'} />}
                       imageClassNames={`max-h-48`}
            />
        )
    });

    return(
        <section className="container">
            {message.length > 0 && <Text tag={`h3`} className={`text-xl mt-12 mb-6`}>{message}</Text>}
            {thumbs.length > 0 ? <Masonry columns={4} spacing={4}>
                {thumbs}
            </Masonry> : ''}
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <div className={`cursor-pointer transition-all flex flex-row justify-center items-center mt-4 p-4 w-full h-48 bg-primary hover:bg-secondary hover:text-secondary-content text-primary-content rounded-lg border-2 border-accent drop-shadow-lg`}>
                    <p className={`w-full text-xl text-center`}>Drag 'n' drop some files here, or click to browse</p>
                </div>
            </div>
        </section>
    )
}
export default Gallery;