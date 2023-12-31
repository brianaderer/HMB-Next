import {flatListToHierarchical} from "@faustwp/core";

const Sidebar = props => {
    const {menuItems} = props;
    if(!menuItems){
        return null;
    }
    // Based on https://www.wpgraphql.com/docs/menus/#hierarchical-data
    const hierarchicalMenuItems = flatListToHierarchical(menuItems);
    return (
        <ul className="menu p-4 w-80 min-h-full bg-base-200 h-[100vh]">
            {
                hierarchicalMenuItems.map(item => {
                    const { id, path, label, children, cssClasses } = item;
                    // @TODO - Remove guard clause after ghost menu items are no longer appended to array.
                    if (!item.hasOwnProperty('__typename')) {
                        return null;
                    }
                    if( !children.length ){
                        return (
                            <li key={id}><a href={path}>{label}</a></li>
                        );
                    } else {
                        return null;
                    }
                })
            }
        </ul>
    )
}
export default Sidebar;