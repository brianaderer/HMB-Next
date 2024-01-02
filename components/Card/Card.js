import {Button, Tag} from '../index';
import {CATEGORIES} from "../../constants/categories";

const Card = props => {
    const{data, callback, activeMarker, id, handleDestroy, expanded} = props;
    const borderColor = CATEGORIES[data.category_tax[0]?.slug].borderCardColor;
    return (
        <div id={id} className={`relative w-full border-r-8 ${borderColor} card lg:card-side bg-neutral drop-shadow-lg overflow-clip rounded-none mb-1`}>
            {expanded && <Button.StandardButton classes={`rounded btn-primary m-2`} callback={handleDestroy}>X</Button.StandardButton>}
            <ul className=" absolute top-2 right-2">{data.category_tax.map( (category, key) => {
                return (
                    <li key={key} className={`text-sm text-neutral-content`}> {category.name} </li>
                )
            } )}</ul>
            {data.photo.length > 0  && <figure><img className={`max-h-80`} src={data.photo} alt={`${data.title} Headline Image`}/></figure>}
            <div className="card-body text-right flex-col justify-start min-h-full">
                <h2 className="card-title  mb-1 text-neutral-content text-right mt-4 justify-end">{data.title}</h2>
                <div className={``}>
                    {data.tags.map((tag, key) => {
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
                        <p className={`text-neutral-content mt-4`} dangerouslySetInnerHTML={{ __html: data.description }}></p>
                    </div>}
                <div className="card-actions justify-end">
                    {!expanded && <Button.StandardButton callback={callback} classes={`btn-primary mt-4`}>Read More</Button.StandardButton>}
                </div>
            </div>
        </div>
    )

}
export default Card;