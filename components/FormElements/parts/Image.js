import { useImperativeFilePicker } from 'use-file-picker';
import {
    FileAmountLimitValidator,
    FileTypeValidator,
    FileSizeValidator,
    ImageDimensionsValidator,
} from 'use-file-picker/validators';
import { Media } from '../../Media';
import {useEffect, useState} from "react";
const Image = props => {
    const {slug, classes, title, setState, required} = props
    const {labelClasses, inputClasses, spanClasses} = classes;
    const { removeFileByIndex, openFilePicker, filesContent, plainFiles ,loading, errors } = useImperativeFilePicker({
        readAs: 'DataURL',
        accept: 'image/*',
        multiple: true,
        readFilesContent: true,
        onFilesSelected: ({ plainFiles, filesContent, errors }) => {
            // this callback is always called, even if there are errors
            console.log('onFilesSelected', plainFiles, filesContent, errors);
        },
        onFilesRejected: ({ errors }) => {
            // this callback is called when there were validation errors
            console.log('onFilesRejected', errors);
        },
        onFilesSuccessfullySelected: ({ plainFiles, filesContent }) => {
            // this callback is called when there were no validation errors
            console.log('onFilesSuccessfullySelected', plainFiles, filesContent);
            setState(filesContent);
        },
        onFileRemoved: (removedFile, removedIndex) => {
            // this callback is called when a file is removed from the list of selected files

            const newFiles = filesContent.filter((_, i) => i !== removedIndex);
            setState(newFiles);
        },
        validators: [
            //new FileAmountLimitValidator({ max: 1 }),
            new FileTypeValidator(['jpg', 'png']),
            // new FileSizeValidator({ maxFileSize: 1024 * 1024 /* 50 MB */ }),
            // new ImageDimensionsValidator({
            //     maxHeight: 900, // in pixels
            //     maxWidth: 1600,
            //     minHeight: 600,
            //     minWidth: 768,
            // }),
        ],
    });
    if (loading) {
        return <div>Loading...</div>;
    }

    if (errors.length) {
        console.log(errors);
        return <div>Error...</div>;
    }

    return(
        <div>
            <button type={'button'} onClick={() => openFilePicker()}>Select files </button>
            <br />
            {
                filesContent.map((file, index) => {
                    return(
                        <div key={index}>
                            <button type={'button'} onClick={()=> removeFileByIndex(index)}>Remove File</button>
                            <h2>{file.name}</h2>
                            <Media.Image size={'thumb'} alt={file.name} src={file.content} />
                            <br />
                        </div>
                    );
                })
            }
        </div>
    )
}
export default Image;