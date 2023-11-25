const tailwindConfig = require('../tailwind.config');
const colors = tailwindConfig.theme.extend.colors;
export const CATEGORIES = {
    'transportation': {
        glyph: 'transportation',
        glyphColor: colors.hmbEnv['cyan'],
        background: colors.hmbBlue[100],
        borderColor: colors.hmbSlate,
    },
    'food-and-drink': {
        glyph: 'food',
        glyphColor: "#ff8300",
        background: "#FFD514",
        borderColor: "#ff8300",
    },
    'day-trip-destinations': {
        glyph: 'dayTrip',
        glyphColor: "#ff8300",
        background: "#FFD514",
        borderColor: "#ff8300",
    },
    'natural-features-and-hikes': {
        glyph: 'nature',
        glyphColor: "#ff8300",
        background: "#FFD514",
        borderColor: "#ff8300",
    },
};