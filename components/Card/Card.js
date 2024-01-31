import {Button, Tag} from '../index';
import {CATEGORIES} from "../../constants/categories";
import {isArray} from "@apollo/client/utilities";

const Card = props => {
    const{data, callback, activeMarker, id, handleDestroy, expanded, firstPlace, catSlug} = props;;
    const slug = CATEGORIES[data.category_tax[0]?.slug] ? data.category_tax[0]?.slug : 'default';
    const borderColor = CATEGORIES[slug].borderCardColor;
    return (
        <div id={`${firstPlace ? catSlug : ''}`} className="metaWrapper">
            <div id={id} className={`relative w-full border-r-8 ${borderColor} card ${expanded ? `flex-col-reverse`: ''} lg:card-side bg-neutral drop-shadow-lg overflow-clip rounded-none mb-1`}>
                {expanded && <Button.StandardButton className={`rounded !btn-sm top-2 left-2 absolute`} callback={handleDestroy}>X</Button.StandardButton>}
                <ul className=" absolute top-2 right-2">{data.category_tax.map( (category, key) => {
                    return (
                        <li key={key} className={`text-sm text-neutral-content`}> {category.name} </li>
                    )
                } )}</ul>
                {data.photo.length > 0  && <figure className={``}><img className={` ${expanded ? `mb-6 mx-6` : `mt-12`} lg:mt-0 max-h-64 lg:max-h-80 overflow-hidden rounded-lg drop-shadow-lg`} src={data.photo} alt={`${data.title} Headline Image`}/></figure>}
                <div className="card-body pt-12 text-left lg:text-right flex-col justify-start min-h-full">
                    <h2 className="card-title mb-1 text-neutral-content lg:mt-4 justify-center lg:justify-end">{data.title}</h2>
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
                                {data.telephone && <a className={`text-accent`} href={`tel:${data.telephone}`}>{data.telephone}</a>}
                                {data.website && <a className={`text-accent`} href={`${data.website}`}>{data.website}</a>}
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