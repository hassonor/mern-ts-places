import { FC, ReactElement } from "react";
import { Outlet } from 'react-router-dom';


const RootLayout: FC = (): ReactElement => {
    return (
        <>
            <main>
                <Outlet/>
            </main>
        </>
    )
}

export default RootLayout;