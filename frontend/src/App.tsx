import { lazy, ReactElement, Suspense } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import RootLayout from "./shared/components/Root.tsx";
import Error404 from "./shared/pages/Error404.tsx";
import { AuthContext } from "./shared/context/auth-context.ts";
import PrivateRoute from "./shared/components/PrivateRoute.tsx";
import { useAuth } from "./shared/hooks/auth-hook.ts";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner.tsx";


const UsersPage = lazy(() => import("./user/pages/Users.tsx"));
const NewPlace = lazy(() => import("./places/pages/NewPlace.tsx"));
const UserPlaces = lazy(() => import("./places/pages/UserPlaces.tsx"));
const UpdatePlace = lazy(() => import("./places/pages/UpdatePlace.tsx"));
const AuthenticationPage = lazy(() => import("./user/pages/AuthenticationPage.tsx"));


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
    const {token, loginAction, logoutAction, userId} = useAuth();


    return (
        <AuthContext.Provider value={{
            isLoggedIn: !!token, token: token, userId: userId, login: loginAction, logout: logoutAction
        }}>
            <Suspense fallback={<LoadingSpinner/>}>
                <RouterProvider router={router}/>
            </Suspense>
        </AuthContext.Provider>)
}

export default App;