import { Media } from '../../Media';
import React from 'react'
import Dropzone from 'react-dropzone'

//@todo refactor to react-dropzone
import {useEffect, useState} from "react";
const Image = props => {
    const {slug, classes, title, setState, state, required} = props
    const {labelClasses, inputClasses, spanClasses} = classes;

    return(
        <>
            {
                state.map((image, key) => {
                    const url = URL.createObjectURL(image);
                    return (
                        <Media.Image key={key} src={url} alt={image.name} size={'thumb'} />
                        )
                } )
            }
            <Dropzone onDrop={acceptedFiles => setState([...state, ...acceptedFiles])}>
                {({getRootProps, getInputProps}) => (
                    <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <div className={`h-32 w-full bg-hmbBlue-100 rounded mt-10`}>Drag 'n' drop some files here, or click to select files</div>
                        </div>
                    </section>
                )}
            </Dropzone>
        </>
    )
}
export default Image;