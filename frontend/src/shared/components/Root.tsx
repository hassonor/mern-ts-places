import { FC, ReactElement } from "react";
import { Outlet } from 'react-router-dom';
import MainNavigation from "./Navigation/MainNavigation.tsx";


const RootLayout: FC = (): ReactElement => {
    return (
        <>
            <MainNavigation/>
            <main className="pt-[5rem]">
                <Outlet/>
            </main>
        </>
    )
}

export default RootLayout;