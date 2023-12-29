import {CATEGORIES} from "../constants/categories";

const categoryLookup = ({category}) => {
    let pinData = [];
    let slug;
    if( category?.slug ){
        pinData = CATEGORIES[category.slug];
        slug = CATEGORIES[category.slug].glyph;
    } else {
        pinData = CATEGORIES['home'];
        slug = 'home';
    }
    return {pinData, slug};
}
export default categoryLookup;