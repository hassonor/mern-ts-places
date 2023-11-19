import { ReactElement, useCallback, useState } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import RootLayout from "./shared/components/Root.tsx";
import Error404 from "./shared/pages/Error404.tsx";
import NewPlace from "./places/pages/NewPlace.tsx";
import UsersPage from "./user/pages/Users.tsx";
import UserPlaces from "./places/pages/UserPlaces.tsx";
import UpdatePlace from "./places/pages/UpdatePlace.tsx";
import AuthenticationPage from "./user/pages/AuthenticationPage.tsx";
import { AuthContext } from "./shared/context/auth-context.ts";
import PrivateRoute from "./shared/components/PrivateRoute.tsx";

/**
 * TODO: IMPROVE AUTH LOGIC WITH loaders and actions.
 */
const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        errorElement: <Error404/>,
        children: [
            {
                index: true,
                element: <UsersPage/>
            },
            {
                path: ':userId/places',
                element: <UserPlaces/>
            },
            {
                path: 'auth',
                element: <AuthenticationPage/>
            },
            {
                path: 'places/new',
                element: <PrivateRoute><NewPlace/></PrivateRoute>,
            },
            {
                path: 'places/:placeId',
                element: <PrivateRoute><UpdatePlace/></PrivateRoute>,
            },
        ]
    },
    {
        path: '*',
        element: <Navigate to="/" replace/>
    }
]);

function App(): ReactElement {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);


    const loginAction = useCallback((userId: string, userToken: string) => {
        setIsLoggedIn(true);
        setUserId(userId);
        window.localStorage.setItem("session", JSON.stringify(userToken));
    }, [])

    const logoutAction = useCallback(() => {
        setIsLoggedIn(false);
        setUserId(null);
        window.localStorage.removeItem("session");
    }, [])

    return (
        <AuthContext.Provider value={{
            isLoggedIn: isLoggedIn, userId: userId, login: loginAction, logout: logoutAction
        }}>
            <RouterProvider router={router}/>
        </AuthContext.Provider>)
}

export default App;