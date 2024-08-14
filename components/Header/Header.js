import {Brand, Nav, Button, ReactDrawer} from '../../components';
import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import {ScreenContext} from "../../contexts";
import { FaCaretUp, FaCaretDown } from "react-icons/fa6";

export default function Header({
  title = 'HMB Marina',
  description,
  menuItems,
  siteLogo,
  children,
}) {
  const [isNavShown, setIsNavShown] = useState(false);
  const logo = siteLogo?.logo ?? null;
  const [open, setOpen] = useState('');
  const router = useRouter();
  const {offScreen, screen, setStuck, stickyExpanded, setStickyExpanded, stickyHeight, setStickyHeight} = useContext(ScreenContext) || {};
  const {navHeight} = screen || {};

  const toggleExpanded = props => {
      setStickyExpanded( !stickyExpanded );
  }
    useEffect(() => {
        setStuck(stickyExpanded);
    }, [stickyExpanded]);


    const topStyle = {
        'top' : navHeight + 4,
    }
    const buttonStyle = {
        'top' : navHeight + 4,
        'height' : stickyHeight,
    }

    // @todo this is the link problem
    useEffect(() => {
        const handleBodyClick = (evt) => {
            if (evt.target.tagName === 'A') {
                const href = evt.target.getAttribute('href');
                if (href) {
                    router.push(href);
                    setOpen('');
                    return; // Exit the function after navigating
                }
            }
            // Check if the parent of the target element is a <details> element
            const parentDetails = evt.target.closest('details');
            if (parentDetails) {
                evt.stopPropagation();
                evt.preventDefault();
                const id = parentDetails.id;
                if ( open=== id ){
                    setOpen('');
                } else {
                    setOpen(id);
                }
            } else {
                setOpen('');
            }

        };
        // Add event listener
        document.body.addEventListener("click", handleBodyClick);

        // Remove event listener on cleanup
        return () => {
            document.body.removeEventListener("click", handleBodyClick);
        };
    }, [open]);
  return (
      <div className="drawer min-h-screen">
        <input id="main-nav" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content min-h-screen flex flex-col justify-between">
          <div id={`nav`} className="z-20 w-full flex flex-row items-center navbar sticky top-0 bg-base-300 border-b-4 border-b-accent">
              <ReactDrawer buttonStyle={buttonStyle} top={topStyle} offScreen={offScreen} setStickyExpanded={setStickyExpanded} expanded={stickyExpanded}>
                  <div id='stickies' style={topStyle} className={`border-b border-b-secondary absolute group stickyContainer w-full border-t border-t-secondary`}>
                      <div className={`relative`}>
                      </div>
                  </div>
              </ReactDrawer>
            <div className="flex-none xl:hidden">
              <label htmlFor="main-nav" aria-label="open sidebar" className="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              </label>
            </div>
            <Brand description={description} title={title} logo={logo} />
            <div className="flex-none hidden xl:block">
              <Nav.Top open={open} menuItems={menuItems} />
            </div>
          </div>
          {children}
        </div>
        <div className="xl:hidden drawer-side h-screen overflow-y-hidden z-10">
          <label htmlFor="main-nav" aria-label="close sidebar" className="drawer-overlay"></label>
          <Nav.Sidebar menuItems={menuItems} />
        </div>
      </div>
  );
}
