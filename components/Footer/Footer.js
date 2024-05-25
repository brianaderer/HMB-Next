import {FooterMenuItem} from "../../components";

export default function Footer({ title, menuItems }) {
  const year = new Date().getFullYear();

  return (
      <div className={`px-4 py-10 h-auto w-full bg-base-300 z-10 border-t-4 border-t-accent flex flex-col items-center justify-center gap-2`}>
          <div className={`flex flex-row gap-4`}>
              <a className={`text-accent-content/70 text-xl`} href={'mailto:info@hmbmarina.com'}>info@hmbmarina.com</a>
              <a className={`text-accent-content/70 text-xl`} href={'tel:(914)271-5400'}>(914)271-5400</a>
          </div>
          <br/>
          <div className={`flex flex-col text-sm text-base-content/50 `}>
              <p className={`w-full text-center`}>Lat 41° 11.833' Lon 41° 53.393'</p>
              <br/>
              <p className={`w-full text-center`}>80 Half Moon Bay Drive</p>
              <p className={`w-full text-center`}>Croton-On-Hudson NY 10552</p>
              <br/>
          </div>
        <ul className={`flex flex-row gap-4 lg:gap-16`}>
          {
            menuItems.map((item, index) => {
              return (
                  <FooterMenuItem path={item.path} key={index}>{item.label}</FooterMenuItem>
              )
            })
        }
        </ul>
          <br/>
          <p className={`text-base-content/50`}>Copyright {year} Half Moon Bay Marina, Inc.</p>
          <p className={`text-base-content/50`}>Web Design by <a className={`text-accent-content/50`} href={'mailto:brian@brianaderer.com'}>Brian Aderer</a> brian@brianaderer.com</p>
      </div>
  );
}
