import * as svg from "../svg";

const parseSvg = ({parser, slug}) => {
    console.log(slug);
    // A marker with a custom inline SVG.
    const pinSvgString = svg[slug] ? svg[slug] : svg['defaultIcon'];
    return parser.parseFromString(
        pinSvgString,
        "image/svg+xml",
    ).documentElement;
}
export default parseSvg;