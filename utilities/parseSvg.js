import * as svg from "../svg";

const parseSvg = ({parser}) => {
    // A marker with a custom inline SVG.
    const pinSvgString = svg.health;
    return parser.parseFromString(
        pinSvgString,
        "image/svg+xml",
    ).documentElement;
}
export default parseSvg;