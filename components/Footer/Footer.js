import {FooterMenuItem} from "../../components";

export default function Footer({ title, menuItems }) {
  const year = new Date().getFullYear();

  return (
      <div className={`h-48 w-full bg-base-300 z-10 border-t-4 border-t-accent flex flex-col items-center justify-center gap-2`}>
        <ul className={`flex flex-row gap-16`}>
          {
            menuItems.map((item, index) => {
              return (
                  <FooterMenuItem path={item.path} key={index}>{item.label}</FooterMenuItem>
              )
            })
        }
        </ul>
          <p className={`text-base-content/20`}>Copyright {year} Half Moon Bay Marina, Inc.</p>
          <p className={`text-base-content/20`}>Web Design by <a className={`text-accent-content/30`} href={'mailto:brian@brianaderer.com'}>Brian Aderer</a> brian@brianaderer.com</p>
      </div>
  );
}
