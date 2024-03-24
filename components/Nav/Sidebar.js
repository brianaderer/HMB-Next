import {flatListToHierarchical} from "@faustwp/core";
import {default as ProfileToggle} from '../../components/Avatar/ProfileToggle';

const Sidebar = props => {
    const {menuItems} = props;
    if(!menuItems){
        return null;
    }
    // Based on https://www.wpgraphql.com/docs/menus/#hierarchical-data
    const hierarchicalMenuItems = flatListToHierarchical(menuItems);
    let profile = {};
    return (
        <ul className="menu p-4 w-80 h-screen flex flex-col overflow-y-hidden justify-center bg-base-200 border-r-2 border-accent/20">
            {
                hierarchicalMenuItems.map(item => {
                    const { id, path, label, children, cssClasses } = item;
                    // @TODO - Remove guard clause after ghost menu items are no longer appended to array.
                    if (!item.hasOwnProperty('__typename')) {
                        return null;
                    }
                    if( label === 'Profile' ){
                        profile = item;
                        return null;
                    }
                    // @TODO - Remove guard clause after ghost menu items are no longer appended to array.
                    if (!item.hasOwnProperty('__typename')) {
                        return null;
                    }
                    return (
                        <li key={id}><a href={path}>{label}</a></li>
                    );

                })
            }
            <ProfileToggle path={profile.path} />
        </ul>
    )
}
export default Sidebar;