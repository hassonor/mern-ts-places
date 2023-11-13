import { FC, ReactNode } from "react";
import { createPortal } from "react-dom";

interface SideDrawerProps {
    children: ReactNode;
}

const SideDrawer: FC<SideDrawerProps> = ({children}) => {
    return createPortal(
        <aside className="fixed left-0 top-0 z-50 h-screen w-2/3 bg-white shadow-md">{children}</aside>,
        document.getElementById('drawer-hook')
    );
}

export default SideDrawer;
