import { Media } from '../../Media';
import React, {useEffect, useState} from 'react'
import {useDropzone} from "react-dropzone";
const Gallery = props => {
    const {slug, classes, title, setState, state, required} = props
    const {labelClasses, inputClasses, spanClasses} = classes;
    const handleTyping = ({content, index}) => {
        const caption = content.target.value;
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

    const thumbs = state.map((file, index) => {
        Object.assign(file, {
            preview: (URL.createObjectURL(file)),
        })
        return (
            <div className={`flex flex-row items-center`} key={index}>
                <div className={`border-2 border-hmbBlue-100 bg-hmbSlate-100 p-4 rounded-lg drop-shadow-lg flex-shrink-0`} >
                    <button type={'button'} onClick={() => removeImage({index})} >x</button>
                    <img className={`h-32 border border-hmbBlue-100 w-auto m-auto rounded drop-shadow-lg`}
                        alt={file.name}
                        src={file.preview}
                        // Revoke data uri after image is loaded
                        onLoad={() => {
                            URL.revokeObjectURL(file.preview)
                        }}
                    />
                    <textarea placeholder={'Give your image a caption!'} className={`text-center rounded mt-4 h-32 w-full bg-hmbBlue-100 p-4`} onChange={content => handleTyping({content, index}) } />
                </div>
            </div>
        )
    });

    return(
        <section className="container">
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <div className={`mt-4 p-4 w-full h-48 bg-hmbSlate-100 rounded-lg border-2 border-hmbBlue-100 drop-shadow-lg`}>Drag 'n' drop some files here, or click to select files</div>
            </div>
            <aside className={`flex flex-row space-x-2 justify-evenly flex-wrap mt-8`}>
                {thumbs}
            </aside>
        </section>
    )
}
export default Gallery;