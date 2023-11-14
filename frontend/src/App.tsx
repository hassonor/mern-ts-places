import { ReactElement } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import RootLayout from "./shared/components/Root.tsx";
import Error404 from "./shared/pages/Error404.tsx";

import NewPlace from "./places/pages/NewPlace.tsx";
import UsersPage from "./user/pages/Users.tsx";
import UserPlaces from "./places/pages/UserPlaces.tsx";
import UpdatePlace from "./places/pages/UpdatePlace.tsx";

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
                path: 'places/new',
                element: <NewPlace/>
            },
            {
                path: 'places/:placeId',
                element: <UpdatePlace/>
            }
        ]
    },
    {
        path: '*',
        element: <Navigate to="/" replace/>
    }
]);

function App(): ReactElement {
    return <RouterProvider router={router}/>;
}

export default App;