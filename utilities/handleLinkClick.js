export const handleLinkClick = (event, url) => {
    event.preventDefault();
    window.open(url, '_blank', 'noopener,noreferrer');
};