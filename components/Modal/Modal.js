import React, {useEffect} from "react";
const Modal = props => {
    const {children, id, onModalClose} = props;
    const handleCloseModal = props => {
        document?.getElementById(id).close();
        console.log('closed');
    }
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) handleCloseModal(); // ESC key
        };

        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    const handleBackdropClick = (event) => {
        // Ensure that the click is on the backdrop, not the modal content
        if (event.target === event.currentTarget) {
            handleCloseModal();
        }
    };
    return(
        <dialog id={id} className="modal" onClick={handleBackdropClick}>
            <div className="modal-box w-11/12 max-w-5xl max-h-[95vh]" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </dialog>
    )
}
export default Modal;