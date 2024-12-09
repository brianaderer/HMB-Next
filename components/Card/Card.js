import { Button, Tag } from '../index';
import { CATEGORIES } from "../../constants/categories";
import { handleLinkClick } from "../../utilities/handleLinkClick";
import { useRef } from "react";
import { Distance } from '../../components';

const Card = (props) => {
    const { setForceExpanded, forceExpanded, distance, data, callback, activeMarker, id, handleDestroy, expanded, firstPlace, catSlug } = props;
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

    const toggleViewState = () => {
        if (expanded && forceExpanded) {
            handleDestroy();
        }
        setForceExpanded((prevState) => !prevState);
    };

    const handleClose = () => {
        handleDestroy();
        setForceExpanded(false);
    };

    return (
        <div
            ref={cardRef}
            id={`${firstPlace ? catSlug : ''}`}
            className={`metaWrapper border-t-accent/20 border-t-2 py-2 grid grid-cols-1 lg:grid-cols-3 gap-4 rounded shadow-md overflow-hidden border-r-8 ${borderColor}`}
        >
            <div className={`col-span-1 ${expanded ? 'lg:col-span-1' : 'lg:col-span-2 '}flex flex-col gap-2`}>
                {expanded && (
                    <div className="grid-row w-full flex justify-start p-2 mb-4">
                        <Button.StandardButton
                            className="rounded !btn-sm"
                            callback={handleClose}
                        >
                            X
                        </Button.StandardButton>
                    </div>
                )}
                {data.photo.length > 0 && (
                    <div
                        className="h-64 lg:h-80 w-full rounded-lg shadow-md bg-cover bg-center"
                        style={{ backgroundImage: `url(${data.photo})` }}
                        aria-label={`${data.title} Headline Image`}
                    ></div>
                )}
                <h2 className="text-xl font-bold text-neutral-content">{data.title}</h2>
                <ul className="text-sm text-neutral-content">
                    {data.category_tax.map((category, key) => (
                        <li key={key}>{category.name}</li>
                    ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                    {data.tags && data.tags.map((tag, key) => (
                        <Tag key={key}>{tag.name}</Tag>
                    ))}
                </div>
            </div>
            <div className={`${expanded ? 'col-span-2' : 'col-span-1'} flex flex-col gap-4 p-4 ${expanded ? 'pt-12' : ''}`}>
                <Distance distance={data.distance} />
                {data.location && expanded && (
                    <div className="flex flex-col gap-2 items-start">
                        <Button.StandardButton
                            className="btn-wide"
                            callback={(event) => handleLinkClick(event, getGoogleMapsDirectionsUrl())}
                        >
                            Get Directions
                        </Button.StandardButton>
                        <Button.StandardButton
                            callback={callback}
                            className="btn-wide"
                        >
                            View On Map
                        </Button.StandardButton>
                    </div>
                )}
                {expanded && (
                    <div className="flex flex-col gap-2">
                        {data.telephone && (
                            <a href={`tel:${data.telephone}`}>{data.telephone}</a>
                        )}
                        {data.website && (
                            <a
                                className="break-words"
                                dangerouslySetInnerHTML={{ __html: data.website }}
                                onClick={(event) => handleLinkClick(event, data.website)}
                            ></a>
                        )}
                        <p
                            className="text-neutral-content"
                            dangerouslySetInnerHTML={{ __html: data.description }}
                        ></p>
                    </div>
                )}
                {!expanded && (
                    <Button.StandardButton
                        callback={toggleViewState}
                        className="btn-wide"
                    >
                        {forceExpanded ? 'Collapse' : 'Read More'}
                    </Button.StandardButton>
                )}
            </div>
        </div>
    );
};

export default Card;
