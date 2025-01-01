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
    const {src, alt, size, ratio='default', className='', onLoad = null} = props;
    const imageSize = size || 'default';
    return (
        <img onLoad={onLoad} className={`flex h-auto w-auto rounded-lg ${className} ${aspect[ratio]} ${sizes[imageSize]}`} alt={alt} src={src}/>
    )
}
export default Image;