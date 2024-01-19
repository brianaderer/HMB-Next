import { useCallback, useEffect, useState } from "react";
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from 'tailwindcss/defaultConfig';

const fullConfig = resolveConfig(tailwindConfig);

export const useMediaQuery = ({setScreen}) => {
    const {screens} = fullConfig.theme;
    // Initialize width with undefined and later set it to window's width if window is available
    const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : undefined);

    const handleResize = useCallback(() => {
        if (typeof window !== 'undefined') {
            setWidth(window.innerWidth);
        }
    }, []);

    function getBreakpoints(width, breakpoints) {
        // Convert breakpoint values to integers and sort them
        const sortedBreakpoints = Object.entries(breakpoints)
            .map(([key, value]) => [key, parseInt(value, 10)])
            .sort((a, b) => a[1] - b[1]);

        // Collect breakpoints that are smaller than the given width
        return sortedBreakpoints
            .filter(([_, bpWidth]) => bpWidth < width)
            .map(([breakpoint, _]) => breakpoint);
    }

    useEffect(() => {
        const breakpoints = getBreakpoints(width, screens);
        const navHeight = document.getElementById('nav').offsetHeight;
        setScreen(
            {
                breakpoints : breakpoints,
                navHeight : navHeight,
            }
        )
    }, [width]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, [handleResize]);

    return width;
};
