import {useContext} from "react";
import {ScreenContext} from "../../contexts";

const Brand = props => {
    const screen = useContext(ScreenContext);
    console.log(screen);
    const {description, title, logo} = props;
    return(
        <div className={`flex-1 flex flex-row items-center px-2 mx-2 relative lg:top-4 justify-end lg:justify-start`}>
            <a className={`flex-row flex`} href="./">
                <img src={logo} className="mr-3 h-6 lg:h-16" alt="Half Moon Bay Logo" />
                <span className="flex flex-col">
                    <span className="self-left whitespace-nowrap text-md lg:text-xl">{title}</span>
                    <span className="hidden lg:static self-left ml-4 whitespace-nowrap text-sm">{description}</span>
                </span>
            </a>
        </div>
    )
}
export default Brand;
