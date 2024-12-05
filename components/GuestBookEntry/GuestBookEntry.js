import {Galleries, Text} from '../index';
import {useEffect} from "react";

const GuestBookEntry = ({entry, key}) => {
    const {acfFields, customFields, imageGallery} = entry;
    const {yearMakeModel, boatType, boatName, reply, beam, boatLengthLoa, draft} = acfFields;
    const {message, name} = customFields;

    return(
        <div className="card mb-2 lg:mb-8 pb-4 lb:pb-8 w-full border-2 border-neutral drop-shadow-lg bg-neutral rounded-xl text-neutral-content">
            <div className="card-body max-md:p-4">
                {imageGallery.length > 0 && <Galleries.Revolving srcName={'src'} captionName={'caption'} className={`max-w-full max-h-80 my-0 p-0`} background={false} oversize={false}
                                             imageGallery={imageGallery}/>}
                <div className="flex flex-col lg:flex-row gap-8 items-start justify-start h-auto mb-4">
                    <div className="flex flex-row items-start justify-start h-full">
                        <Text className={`text-6xl text-left tracking-tighter h-full`} ntagName={`h4`}>{boatName}</Text>
                    </div>
                    <div className="flex-col items-start flex">
                        {yearMakeModel && <Text tagname={`p`}>{`Make and Model:  <strong>${yearMakeModel}</strong>`}</Text>}
                        {boatLengthLoa && <Text tagname={`p`}>{`Length:  <strong>${boatLengthLoa}</strong>`}</Text>}
                        {boatType && <Text tagname={`p`}>{`Type:  <strong>${boatType}</strong>`}</Text>}
                        {beam && <Text tagname={`p`}>{`Beam:  <strong>${beam}</strong>`}</Text>}
                        {draft && <Text tagname={`p`}>{`Draft: <strong>${draft}</strong>`}</Text>}
                    </div>
                </div>
                <div className="flex flex-row gap-4 items-center">
                    <Text tagName={`p`}>
                        {`${message} <br /><br /> - <strong>${name}</strong>`}
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