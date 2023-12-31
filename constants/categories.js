const tailwindConfig = require('../tailwind.config');
const colors = tailwindConfig.theme.extend.colors;
export const CATEGORIES = {
    'transportation': {
        glyph: 'transportation',
        glyphColor: colors.hmbBlue[100],
        background: colors.hmbEnv['cyan'],
        borderColor: colors.hmbSlate[500],
        backgroundColor: 'bg-hmbEnv-cyan',
        borderCardColor: 'border-hmbEnv-cyan',
        textColor: 'text-hmbBlue-100',
    },
    'home': {
        glyph: 'home',
        glyphColor: colors.hmbBlue[100],
        background: colors.hmbBlue[300],
        borderColor: colors.hmbSlate[500],
        backgroundColor: 'bg-hmbBlue-300',
        borderCardColor: 'border-hmbBlue-300',
        textColor: 'text-hmbBlue-100',
    },
    'food-and-drink': {
        glyph: 'food',
        glyphColor: colors.hmbBlue[100],
        background: colors.hmbEnv['fucshia'],
        borderColor: colors.hmbSlate[500],
        backgroundColor: "bg-hmbEnv-fucshia",
        borderCardColor: 'border-hmbEnv-fucshia',
        textColor: 'text-hmbBlue-100',
    },
    'day-trip-destinations': {
        glyph: 'dayTrip',
        glyphColor: colors.hmbBlue[100],
        background: colors.hmbEnv['stone'],
        borderColor: colors.hmbSlate[500],
        backgroundColor: "bg-hmbEnv-stone",
        borderCardColor: 'border-hmbEnv-stone',
        textColor: 'text-hmbBlue-100',
    },
    'natural-features-and-hikes': {
        glyph: 'nature',
        glyphColor: colors.hmbBlue[100],
        background: colors.hmbEnv['forest'],
        borderColor: colors.hmbSlate[500],
        backgroundColor: "bg-hmbEnv-forest",
        borderCardColor: 'border-hmbEnv-forest',
        textColor: 'text-hmbBlue-100',
    },
};