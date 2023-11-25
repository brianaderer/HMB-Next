import {useEffect, useState} from "react";

const PlaceInfo = props => {
    const {title, address, description, tags, categories, website, telephone} = props;
    return(
        <div id={`placeInfo`}>
            <h3>Title: {title}</h3>
            <p>Address: {address}</p>
            <div><h3>Our Take:</h3><div dangerouslySetInnerHTML={{ __html: description }} /></div>
            <div>
                Tags:
                {tags?.map((tag, index) => {
                    return( <p key={index}>{tag}</p> )
                })}
            </div>
            <div>
                Categories:
                {categories?.map((category, index) => {
                    return( <p key={index}>{category}</p> )
                })}
            </div>
            <a href={website}>Visit Online</a>
            <a href={`tel:` + telephone }>Telephone: {telephone}</a>
        </div>
    )
}
export default PlaceInfo;