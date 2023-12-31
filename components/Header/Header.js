import {Brand, Nav} from '../index';
import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Header({
  title = 'Headless by WP Engine',
  description,
  menuItems,
  siteLogo,
  children,
}) {
  const [isNavShown, setIsNavShown] = useState(false);
  const {logo} = siteLogo;
  const [open, setOpen] = useState('');
  const router = useRouter();



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
          {/* Navbar */}
          <div className="w-full navbar bg-base-300 z-10">
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
        <div className="xl:hidden drawer-side h-full">
          <label htmlFor="main-nav" aria-label="close sidebar" className="drawer-overlay"></label>
          <Nav.Sidebar menuItems={menuItems} />
        </div>
      </div>
  );
}
