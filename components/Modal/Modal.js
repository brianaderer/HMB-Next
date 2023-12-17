import React, {useEffect} from "react";
const Modal = props => {
    const {children, id, onModalClose} = props;
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) onModalClose(); // ESC key
        };

        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onModalClose]);

    const handleBackdropClick = (event) => {
        // Ensure that the click is on the backdrop, not the modal content
        if (event.target === event.currentTarget) {
            onModalClose();
        }
    };
    return(
        <dialog id={id} className="modal" onClick={handleBackdropClick}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4">Press ESC key or click outside to close</p>
                {children}
            </div>
        </dialog>
    )
}
export default Modal;