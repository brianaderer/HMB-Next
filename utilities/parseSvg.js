import * as svg from "../svg";

const parseSvg = ({parser, slug}) => {
    // A marker with a custom inline SVG.
    return svg[slug] ? svg[slug] : svg['defaultIcon'];
}
export default parseSvg;