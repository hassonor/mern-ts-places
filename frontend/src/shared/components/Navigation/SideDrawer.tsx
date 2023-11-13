import React, { FC } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';

interface SideDrawerProps {
    children: React.ReactNode;
    show: boolean;
    onClick: () => void;
}

const SideDrawer: FC<SideDrawerProps> = ({children, show, onClick}) => {
    return createPortal(
        <CSSTransition
            in={show}
            timeout={100}
            classNames={{
                enter: 'transform -translate-x-full',
                enterActive: 'translate-x-0 transition ease-out duration-200',
                exit: 'transform translate-x-0',
                exitActive: '-translate-x-full transition ease-in duration-200'
            }}
            mountOnEnter
            unmountOnExit
        >
            <aside className="fixed left-0 top-0 z-50 h-screen w-2/3 bg-white shadow-md" onClick={onClick}>
                {children}
            </aside>
        </CSSTransition>,
        document.getElementById('drawer-hook') as HTMLElement
    );
};

export default SideDrawer;
