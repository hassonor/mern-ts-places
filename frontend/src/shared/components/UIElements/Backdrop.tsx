import React, { ReactElement } from 'react';
import { createPortal } from 'react-dom';

interface BackdropProps {
    onClick: () => void;
}

const Backdrop: React.FC<BackdropProps> = ({onClick}): ReactElement => {
    return createPortal(
        <div
            className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-75 z-10"
            onClick={onClick}>
        </div>,
        document.getElementById('backdrop-hook') as HTMLElement
    );
};

export default Backdrop;
