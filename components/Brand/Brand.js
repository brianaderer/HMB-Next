import Link from "next/link";
import {Media} from '../Media';
import {Navbar} from "flowbite-react";

const Brand = props => {
    const {description, title, logo} = props;
    return(
        <Navbar.Brand className={`relative top-4`} as={Link} href="">
            <img src={logo} className="mr-3 h-20 relative top-4" alt="Half Moon Bay Logo" />
            <span className="flex flex-col">
                <span className="self-left whitespace-nowrap text-xl font-semibold text-hmbBlue-700 dark:text-white">{title}</span>
                <span className="self-left ml-4 whitespace-nowrap text-sm font-semibold text-hmbBlue-300 dark:text-white">{description}</span>
            </span>
        </Navbar.Brand>
    )
}
export default Brand;
