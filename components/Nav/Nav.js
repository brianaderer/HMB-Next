import { gql } from '@apollo/client';
import Link from 'next/link';
import { flatListToHierarchical } from '@faustwp/core';
import {NavbarLink, Navbar, Dropdown, DropdownItem} from "flowbite-react";
import NavigationMenu from "../NavigationMenu/NavigationMenu";
const Nav = props => {
    const {menuItems} = props;
    if(!menuItems){
        return null;
    }
    // Based on https://www.wpgraphql.com/docs/menus/#hierarchical-data
    const hierarchicalMenuItems = flatListToHierarchical(menuItems);


    return (
        <>
        {
            hierarchicalMenuItems.map(item => {
                const { id, path, label, children, cssClasses } = item;
                // @TODO - Remove guard clause after ghost menu items are no longer appended to array.
                if (!item.hasOwnProperty('__typename')) {
                    return null;
                }
                if( !children.length ){
                    return (
                        <NavbarLink key={id} href={path}>{label}</NavbarLink>
                    );
                } else {
                    return (
                        <Dropdown label={label} arrowIcon={`false`} inline>
                            {children.map(child => {
                                if (!child.hasOwnProperty('__typename')) {
                                    return null;
                                }
                                const { id, path, label, children, cssClasses } = child;
                                return (
                                    <DropdownItem key={id} href={path}>{label}</DropdownItem>
                                )
                            })}
                        </Dropdown>
                    )
                }
            })
        }
        </>
    )
}
export default Nav;

Nav.fragments = {
    entry: gql`
    fragment NavigationMenuItemFragment on MenuItem {
      id
      path
      label
      parentId
      cssClasses
      menu {
        node {
          name
        }
      }
    }
  `,
};