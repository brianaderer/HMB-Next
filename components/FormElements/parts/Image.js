import { useImperativeFilePicker } from 'use-file-picker';
import {
    FileAmountLimitValidator,
    FileTypeValidator,
    FileSizeValidator,
    ImageDimensionsValidator,
} from 'use-file-picker/validators';
import { Media } from '../../Media';
const Image = props => {
    const { openFilePicker, filesContent, loading, errors } = useImperativeFilePicker({
        readAs: 'DataURL',
        accept: 'image/*',
        multiple: true,
        validators: [
            //new FileAmountLimitValidator({ max: 1 }),
            new FileTypeValidator(['jpg', 'png']),
            // new FileSizeValidator({ maxFileSize: 50 * 1024 * 1024 /* 50 MB */ }),
            // new ImageDimensionsValidator({
            //     maxHeight: 900, // in pixels
            //     maxWidth: 1600,
            //     minHeight: 600,
            //     minWidth: 768,
            // }),
        ],
    });
    const {slug, handler, classes, value, title, required} = props
    const {labelClasses, inputClasses, spanClasses} = classes;
    if (loading) {
        return <div>Loading...</div>;
    }

    if (errors.length) {
        console.log(errors);
        return <div>Error...</div>;
    }
    console.log(filesContent);
    return(
        <div>
            <button type={'button'} onClick={() => openFilePicker()}>Select files </button>
            <br />
            {filesContent.map((file, index) => (
                <div key={index}>
                    <h2>{file.name}</h2>
                    <Media.Image size={'thumb'} alt={file.name} src={file.content} />
                    <br />
                </div>
            ))}
        </div>
    )
}
export default Image;