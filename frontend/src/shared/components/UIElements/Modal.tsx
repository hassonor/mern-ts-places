import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
    title: React.ReactNode;
    footer: React.ReactNode;
    children: React.ReactNode;
}

export interface ModalHandles {
    open: () => void;
    close: () => void;
}

const Modal = forwardRef<ModalHandles, ModalProps>(({title, footer, children}, ref) => {
    const dialog = useRef<HTMLDialogElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const closeTimeout = useRef<NodeJS.Timeout | null>(null);

    useImperativeHandle(ref, () => ({
        open: () => {
            dialog.current?.showModal();
            setIsOpen(true);
        },
        close: () => {
            setIsOpen(false);
            if (closeTimeout.current) {
                clearTimeout(closeTimeout.current);
            }
            closeTimeout.current = setTimeout(() => dialog.current?.close(), 100);
        },
    }));

    useEffect(() => {
        // Cleanup on component unmount
        return () => {
            if (closeTimeout.current) {
                clearTimeout(closeTimeout.current);
            }
        };
    }, []);

    const modalAnimationClass = isOpen ? 'animate-blowUpIn' : 'animate-blowUpOut';

    if (!document.getElementById('modal-hook')) {
        const div = document.createElement('div');
        div.id = 'modal-hook';
        document.body.appendChild(div);
    }

    return createPortal(
        <dialog ref={dialog} className={`fixed inset-0 m-auto bg-white shadow-lg rounded-lg ${modalAnimationClass}`}>
            <header className="py-4 px-2 bg-[#2a006e] text-white">
                <div className="m-2">{title}</div>
            </header>
            <div className="py-4 px-2">
                {children}
            </div>
            <footer className="py-4 px-2 flex justify-end">
                {footer}
            </footer>
        </dialog>,
        document.getElementById('modal-hook')!
    );
});

export default Modal;
