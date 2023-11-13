import { FC, ReactNode } from "react";


interface MainHeaderProps {
    children: ReactNode
}


const MainHeader: FC<MainHeaderProps> = ({children}) => {
    return (
        <header
            className="w-full h-16 flex items-center fixed top-0 left-0 bg-[#ff0040] shadow-md px-4 z-10 lg:justify-between">
            {children}
        </header>
    );
};

export default MainHeader;