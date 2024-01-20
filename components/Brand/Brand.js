import Link from "next/link";
import {Media} from '../Media';
import {Navbar} from "flowbite-react";

const Brand = props => {
    const {description, title, logo} = props;
    return(
        <div className={`flex-1 px-2 mx-2 relative top-4`}>
            <a className={`flex-row flex`} href="./">
                <img src={logo} className="mr-3 h-6 lg:h-16" alt="Half Moon Bay Logo" />
                <span className="flex flex-col">
                    <span className="self-left whitespace-nowrap text-xl">{title}</span>
                    <span className="self-left ml-4 whitespace-nowrap text-sm">{description}</span>
                </span>
            </a>
        </div>
    )
}
export default Brand;
