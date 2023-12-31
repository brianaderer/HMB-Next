import { gql } from '@apollo/client';
import { flatListToHierarchical } from '@faustwp/core';
const Top = props => {
    const {menuItems} = props;
    if(!menuItems){
        return null;
    }
    // Based on https://www.wpgraphql.com/docs/menus/#hierarchical-data
    const hierarchicalMenuItems = flatListToHierarchical(menuItems);


    return (
        <ul className="menu menu-horizontal px-1">
            {
                hierarchicalMenuItems.map(item => {
                    const { id, path, label, children, cssClasses } = item;
                    // @TODO - Remove guard clause after ghost menu items are no longer appended to array.
                    if (!item.hasOwnProperty('__typename')) {
                        return null;
                    }
                    if( !children.length ){
                        return (
                            <li className={""} key={id}><a href={path}>{label}</a></li>
                        );
                    } else {
                        return (
                            <li>
                                <details key={id}>
                                    <summary>{label}</summary>
                                    <ul className="p-2 bg-base-100 rounded-t-none">
                                        {children.map(child => {
                                            if (!child.hasOwnProperty('__typename')) {
                                                return null;
                                            }
                                            const { id, path, label, children, cssClasses } = child;
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