const sizes = {
    'default': '',
    'thumb' : 'max-h-28',
}

const Image = props => {
    const {src, alt, size} = props;
    const imageSize = size || 'default';
    return (
        <img className={`h-auto w-auto ${sizes[imageSize]}`} alt={alt} src={src}/>
    )
}
export default Image;