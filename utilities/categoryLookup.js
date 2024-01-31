import {CATEGORIES} from "../constants/categories";

const categoryLookup = ({category}) => {
    let pinData = [];
    const cat = CATEGORIES[category.slug] ? category.slug : 'default';
    let slug;
    if( category?.slug ){
        pinData = CATEGORIES[cat];
        slug = CATEGORIES[cat].glyph;
    } else {
        pinData = CATEGORIES['home'];
        slug = 'home';
    }
    return {pinData, slug};
}
export default categoryLookup;