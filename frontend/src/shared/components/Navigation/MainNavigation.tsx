import React from 'react';
import MainHeader from "./MainHeader.tsx";
import { Link } from "react-router-dom";


const MainNavigation = props => {
    return (
        <MainHeader>
            <button
                className="w-12 h-12 bg-transparent border-none flex flex-col justify-around mr-8 cursor-pointer lg:hidden">
                <span className="block w-12 h-0.5 bg-white"/>
                <span className="block w-12 h-0.5 bg-white"/>
                <span className="block w-12 h-0.5 bg-white"/>
            </button>
            <h1 className="text-white">
                <Link to="/" className="no-underline text-white font-bold">ISRAEL</Link>
            </h1>
            <nav className="hidden lg:block">
                {/* Your nav items */}
            </nav>
        </MainHeader>
    )
};


export default MainNavigation;