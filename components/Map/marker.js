
const marker = props => {
    const {title, document} = props;
    const marker = document.createElement("div");
    marker.textContent = title;
    marker.className = 'bg-red-500 h-auto w-auto p-4 rounded-full';
    return marker;
}
export default marker;