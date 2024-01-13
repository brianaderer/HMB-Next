const sizes = {
    'default': '',
    'thumb' : 'max-h-28',
    'thumb-sm' : 'max-h-16',
    'medium': 'max-h-96',
}
const aspect = {
    'default': '',
    'square' : 'aspect-square',
    'video' : 'aspect-video',
}

const Image = props => {
    const {src, alt, size, ratio='default', className=''} = props;
    const imageSize = size || 'default';
    return (
        <img className={`flex h-auto w-auto ${className} ${aspect[ratio]} ${sizes[imageSize]}`} alt={alt} src={src}/>
    )
}
export default Image;