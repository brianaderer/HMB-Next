import { Button, Card } from 'flowbite-react';
import {Link} from './Link';
import { Tag } from '../Tag';


const PlaceCard = props => {
    const{data, onClick, activeMarker} = props;
    console.log(data);
    const expanded = activeMarker?.id === data.location.place_id;
    console.log(expanded);
    return (
        <Card className="w-full mt-4 relative">
            <ul className=" absolute top-2 right-2">{data.category_tax.map( (category, key) => {
                return (
                    <li key={key} className={`text-sm`}> {category.name} </li>
                )
            } )}</ul>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {data.title}
            </h5>
            <div className="flex flex-row gap-4 h-full">
                {data.photo &&
                    <div className="w-1/3 flex justify-center items-center">
                        <img className={`rounded drop-shadow-lg h-auto w-auto max-h-48 max-w-1/3`} src={data.photo} alt="Description" />
                    </div>
                }
                <div className="min-w-[33%] w-auto flex flex-col h-full justify-center flex-wrap items-center">
                    {data.tags.map((tag, key) => {
                    return(
                        <Tag key={key}> {tag.name} </Tag>
                        )
                    })}
                </div>
            </div>
            {expanded &&
                <div className="flex flex-col">
                    <div className="flex flex-row">
                        {data.telephone && <Link href={`tel:${data.telephone}`}>{data.telephone}</Link>}
                        {data.website && <Link href={`${data.website}`}>{data.website}</Link>}
                    </div>
                    <p className="font-normal text-gray-700 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: data.description }}></p>
                </div>}
            { !expanded &&
                <Button onClick={onClick}>
                Read more
                <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </Button>}
        </Card>
    );
}

export default PlaceCard;