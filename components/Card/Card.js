import {Button, Tag} from '../index';
import {CATEGORIES} from "../../constants/categories";
import {handleLinkClick} from "../../utilities/handleLinkClick";

const Card = props => {
    const{distance, data, callback, activeMarker, id, handleDestroy, expanded, firstPlace, catSlug} = props;
    const slug = CATEGORIES[data.category_tax[0]?.slug] ? data.category_tax[0]?.slug : 'default';
    const borderColor = CATEGORIES[slug].borderCardColor;

    // Event handler to open link in a new tab


    return (
        <div id={`${firstPlace ? catSlug : ''}`} className="metaWrapper">
            <div id={id} className={`relative w-full border-r-8 ${borderColor} card ${expanded ? `flex-col-reverse`: ''} lg:card-side bg-neutral drop-shadow-md overflow-clip rounded-none mb-1`}>
                {expanded && <Button.StandardButton className={`rounded !btn-sm top-2 left-2 absolute`} callback={handleDestroy}>X</Button.StandardButton>}
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
                    <div>
                        {distance?.walking && <p className="text-sm text-neutral-content">Walking: {distance.walking.duration.text} / {distance.walking.distance.text}</p>}
                        {distance?.driving && <p className="text-sm text-neutral-content">Driving: {distance.driving.duration.text} / {distance.driving.distance.text}</p>}
                    </div>
                    <div className={`flex flex-wrap gap-2 justify-center lg:justify-end`}>
                        {
                            data.tags && data?.tags?.map((tag, key) => {
                            return(
                                <Tag key={key}> {tag.name} </Tag>
                            )
                        })}
                    </div>
                    {expanded &&
                        <div className="flex flex-col">
                            <div className="flex flex-col">
                                {data.telephone && <a className={``} href={`tel:${data.telephone}`}>{data.telephone}</a>}
                                {data.website && (
                                    <a
                                        className={'cursor-pointer'}
                                        dangerouslySetInnerHTML={{ __html: data.website }}
                                        onClick={(event) => handleLinkClick(event, data.website)}
                                    ></a>
                                )}
                            </div>
                            <p className={`text-neutral-content lg:mt-4`} dangerouslySetInnerHTML={{ __html: data.description }}></p>
                        </div>}
                    <div className="card-actions justify-center lg:justify-end">
                        {!expanded && <Button.StandardButton callback={callback} className={`max-lg:btn-wide mt-4`}>Read More</Button.StandardButton>}
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Card;