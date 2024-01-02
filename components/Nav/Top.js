import { gql } from '@apollo/client';
import {Avatar} from '../index';
import { flatListToHierarchical } from '@faustwp/core';
const Top = props => {
    const {menuItems, open} = props;
    if(!menuItems){
        return null;
    }
    // Based on https://www.wpgraphql.com/docs/menus/#hierarchical-data
    const hierarchicalMenuItems = flatListToHierarchical(menuItems);
    let profile = {};

    return (
        <div className={`flex flex-row`}>
        <ul className="menu menu-horizontal px-1">
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
                    if( !children.length ){
                        return (
                            <li className={""} key={id}><a href={path}>{label}</a></li>
                        );
                    } else {
                        return (
                            <li key={id}>
                                <details id={id} open={open === id}>
                                    <summary>{label}</summary>
                                    <ul className="p-2 bg-neutral rounded-t-none">
                                        {children.map(child => {
                                            if (!child.hasOwnProperty('__typename')) {
                                                return null;
                                            }
                                            const { id, path, label } = child;
                                            return (
                                                <li key={id}><a href={path}>{label}</a></li>
                                            )
                                        })}
                                    </ul>
                                </details>
                            </li>
                        )
                    }
                })
            }
        </ul>
            <Avatar.Dropdown open={open} profile={profile} />
        </div>
    )
}
export default Top;

// Top.fragments = {
//     entry: gql`
//     fragment NavigationMenuItemFragment on MenuItem {
//       id
//       path
//       label
//       parentId
//       cssClasses
//       menu {
//         node {
//           name
//         }
//       }
//     }
//   `,
// };