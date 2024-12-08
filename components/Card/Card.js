import {Button, Tag} from '../index';
import {CATEGORIES} from "../../constants/categories";
import {handleLinkClick} from "../../utilities/handleLinkClick";
import {useRef, useEffect} from "react";
import {Distance} from '../../components';
import {StandardButton} from "../Button";

const Card = props => {
    const{setForceExpanded, forceExpanded, distance, data, callback, activeMarker, id, handleDestroy, expanded, firstPlace, catSlug} = props;
    const slug = CATEGORIES[data.category_tax[0]?.slug] ? data.category_tax[0]?.slug : 'default';
    const borderColor = CATEGORIES[slug].borderCardColor;
    const cardRef = useRef(null);

    function getGoogleMapsDirectionsUrl() {
        const baseUrl = "https://www.google.com/maps/dir/?api=1";
        const origin = "Half Moon Bay Marina, Half Moon Bay Drive, Croton-on-Hudson, NY";
        const params = new URLSearchParams({
            origin: origin,
            destination: `${data.location.lat},${data.location.lng}`,
        });
        return `${baseUrl}&${params.toString()}`;
    }

    // Event handler to open link in a new tab

    const toggleViewState = () => {
        if( expanded && forceExpanded ){
            handleDestroy();
        }
        setForceExpanded(prevState => !prevState);
    }

    const handleClose = () => {
        handleDestroy();
        setForceExpanded(false);
    }

    return (
        <div ref={cardRef} id={`${firstPlace ? catSlug : ''}`} className="metaWrapper">
            <div id={id} className={`relative w-full border-r-8 ${borderColor} card ${expanded ? `flex-col-reverse`: ''} lg:card-side bg-neutral drop-shadow-md overflow-clip rounded-none mb-1`}>
                {expanded && <Button.StandardButton className={`rounded !btn-sm top-2 left-2 absolute`} callback={handleClose}>X</Button.StandardButton>}
                <div className=" absolute top-2 right-2">
                <ul>{data.category_tax.map( (category, key) => {
                    return (
                        <li key={key} className={`text-sm text-neutral-content`}> {category.name} </li>
                    )
                } )}</ul>
                </div>
                {data.photo.length > 0 && (
                    <div
                        className={`flex flex-row w-full !justify-start ${expanded ? 'mb-6 mx-6 lg:mt-14' : 'lg:mt-0'} h-64 lg:h-80 !max-w-[60%] overflow-hidden rounded-lg drop-shadow-md`}
                        style={{
                            backgroundImage: `url(${data.photo})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                        aria-label={`${data.title} Headline Image`}
                    ></div>
                )}
                <div className="card-body pt-12 text-left lg:text-right flex-col justify-start min-h-full">
                    <h2 className="card-title mb-1 text-neutral-content lg:mt-4 justify-center lg:justify-end">{data.title}</h2>
                    <div className={`flex flex-wrap gap-2 justify-center lg:justify-end`}>
                        {
                            data.tags && data?.tags?.map((tag, key) => {
                                return (
                                    <Tag key={key}> {tag.name} </Tag>
                                )
                            })}
                    </div>
                    <div className="card-actions justify-center lg:justify-end flex flex-col items-end">
                        <Distance distance={data.distance}/>
                        {data.location && expanded && (
                            <div className={'flex flex-row gap-2 items-center'}>
                            <Button.StandardButton
                                className={`max-lg:btn-wide`}
                                callback={(event) => handleLinkClick(event, getGoogleMapsDirectionsUrl())}
                            >Get Directions</Button.StandardButton>
                            <Button.StandardButton callback={callback} className={`max-lg:btn-wide`}>View On
                        Map</Button.StandardButton>
                            </div>
                        )}
                    </div>
                    {expanded &&
                        <div className="flex flex-col">
                            <div className="flex flex-col">
                                {data.telephone &&
                                    <a className={``} href={`tel:${data.telephone}`}>{data.telephone}</a>}
                                {data.website && (
                                    <a
                                        className={'cursor-pointer'}
                                        dangerouslySetInnerHTML={{__html: data.website}}
                                        onClick={(event) => handleLinkClick(event, data.website)}
                                    ></a>
                                )}
                            </div>
                            <p className={`text-neutral-content lg:mt-4`}
                               dangerouslySetInnerHTML={{__html: data.description}}></p>
                        </div>}
                    <div className="card-actions justify-center lg:justify-end">
                        {!expanded && <Button.StandardButton callback={toggleViewState}
                                                             className={`max-lg:btn-wide mt-4`}>{forceExpanded ? 'Collapse' : 'Read More'}</Button.StandardButton>}
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Card;