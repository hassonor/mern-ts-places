import { FC, ReactElement } from "react";
import { Outlet, useNavigation } from 'react-router-dom';
import MainNavigation from "./Navigation/MainNavigation.tsx";
import LoadingSpinner from "./UIElements/LoadingSpinner.tsx";

const RootLayout: FC = (): ReactElement => {
    const navigation = useNavigation();

    return (
        <>
            <MainNavigation/>
            <main className={`pt-[5rem] ${navigation.state === 'loading' ? 'relative' : ''}`}>
                {navigation.state === 'loading' && <LoadingSpinner asOverlay={true}/>}
                <Outlet/>
            </main>
        </>
    )
}

export default RootLayout;
