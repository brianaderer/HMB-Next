import Link from "next/link";
import {Media} from '../Media';

const Brand = props => {
    const {description, title, logo} = props;
    return(
        <div className={`flex flex-row gap-4`}>
            <Media.Image size={`thumb-sm`} src={logo} alt={'Site Logo'} />
            <div className="flex flex-col">
            <Link legacyBehavior href="/">
                <a className={``}>{title}</a>
            </Link>
            {description && <p className={``}>{description}</p>}
            </div>
        </div>
    )
}
export default Brand;
