import {Galleries, Text} from '../index';
const GuestBookEntry = props => {
    const {reply, beam, boat_length_loa, boat_name, boat_type, draft, email, full_name, message, return_image_gallery : gallery = [], year_make_model} = props.entry;
    const images = gallery.map(image => {
       const {src: url, caption, alt } = JSON.parse(image);
       return {src: url, caption: caption, alt: alt};
    })
    return(
        <div className="card mb-2 lg:mb-8 pb-4 lb:pb-8 w-full border-2 border-neutral drop-shadow-lg bg-neutral rounded-xl text-neutral-content">
            <div className="card-body max-md:p-4">
                {images.length > 0 && <Galleries.MasonryComponent imgSize={'small'} srcName={'src'} captionName={'caption'} className={`max-w-full max-h-80 my-0 p-0`} background={false} oversize={false}
                                             posts={{...images}}/>}
                <div className="flex flex-col lg:flex-row gap-8 items-start justify-start h-auto mb-4">
                    <div className="flex flex-row items-start justify-start h-full">
                        <Text className={`text-6xl text-left tracking-tighter h-full`} tagName={`h4`}>{boat_name}</Text>
                    </div>
                    <div className="flex-col items-start flex">
                        {year_make_model && <Text tagname={`p`}>{`Make and Model:  <strong>${year_make_model}</strong>`}</Text>}
                        {boat_length_loa && <Text tagname={`p`}>{`Length:  <strong>${boat_length_loa}</strong>`}</Text>}
                        {boat_type && <Text tagname={`p`}>{`Type:  <strong>${boat_type}</strong>`}</Text>}
                        {beam && <Text tagname={`p`}>{`Beam:  <strong>${beam}</strong>`}</Text>}
                        {draft && <Text tagname={`p`}>{`Draft: <strong>${draft}</strong>`}</Text>}
                    </div>
                </div>
                <div className="flex flex-row gap-4 items-center">
                    <Text tagName={`p`}>
                        {`${message} <br /><br /> - <strong>${full_name}</strong>`}
                    </Text>
                </div>
                {reply && <div className="chat chat-end mt-8">
                    <div className="chat-bubble chat-bubble-primary p-6">
                        <Text tagName={`p`}>
                            {`${reply} <br /><br /> - <strong>HMB</strong>`}
                        </Text>
                    </div>
                </div>}
            </div>
        </div>
    )
}
export default GuestBookEntry;