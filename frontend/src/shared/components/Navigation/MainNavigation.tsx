import { FC } from "react";
import MainHeader from "./MainHeader.tsx";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks.tsx";
import SideDrawer from "./SideDrawer.tsx";


const MainNavigation: FC = () => {
    return (
        <>
            <SideDrawer>
                <nav className="h-full">
                    <NavLinks/>
                </nav>
            </SideDrawer>
            <MainHeader>
                <button
                    className="w-12 h-12 bg-transparent border-none flex flex-col justify-around mr-8 cursor-pointer lg:hidden">
                    <span className="block w-12 h-0.5 bg-white"/>
                    <span className="block w-12 h-0.5 bg-white"/>
                    <span className="block w-12 h-0.5 bg-white"/>
                </button>
                <h1 className="text-white">
                    <Link to="/" className="no-underline text-black-300 font-bold">ISRAEL</Link>
                </h1>
                <nav className="hidden lg:block">
                    <NavLinks/>
                </nav>
            </MainHeader>
        </>
    )
};


export default MainNavigation;