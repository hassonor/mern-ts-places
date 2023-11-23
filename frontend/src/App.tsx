import { ReactElement } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import RootLayout from "./shared/components/Root.tsx";
import { AuthContext } from "./shared/context/auth-context.ts";
import PrivateRoute from "./shared/components/PrivateRoute.tsx";
import { useAuth } from "./shared/hooks/auth-hook.ts";
import { fetchUserPlacesLoader, fetchUsersLoader } from "./shared/utils/http-requests.ts";
import UsersPage from "./user/pages/Users.tsx";
import AuthenticationPage from "./user/pages/AuthenticationPage.tsx";
import UserPlaces from "./places/pages/UserPlaces.tsx";
import NewPlace from "./places/pages/NewPlace.tsx";
import UpdatePlace from "./places/pages/UpdatePlace.tsx";
import CustomErrorPage from "./shared/pages/CustomError.tsx";


const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        errorElement: <CustomErrorPage/>,
        children: [
            {
                index: true,
                element: <UsersPage/>,
                loader: ({request}) => fetchUsersLoader({request})
            },
            {
                path: 'auth',
                element: <AuthenticationPage/>
            },
            {
                path: ':userId/places',
                element: <UserPlaces/>,
                loader: fetchUserPlacesLoader
            },
            {
                path: ':userId/places/new',
                element: <PrivateRoute><NewPlace/></PrivateRoute>,
            },
            {
                path: ':userId/places/:placeId',
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
    const {token, loginAction, logoutAction, userId} = useAuth();


    return (
        <AuthContext.Provider value={{
            isLoggedIn: !!token, token: token, userId: userId, login: loginAction, logout: logoutAction
        }}>
            <RouterProvider router={router}/>
        </AuthContext.Provider>)
}

export default App;

