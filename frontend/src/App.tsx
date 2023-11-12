import { ReactElement } from "react";
import { createBrowserRouter, RouterProvider,Navigate } from 'react-router-dom';
import RootLayout from "./shared/components/Root.tsx";
import Error404 from "./shared/pages/Error404.tsx";
import UserPage from "./user/pages/Users.tsx";
import NewPlaces from "./places/pages/NewPlaces.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <Error404 />,
        children: [
            {
                index: true,
                element: <UserPage />
            },
            {
                path: 'places/new',
                element: <NewPlaces />
            }
        ]
    },
    {
        path: '*',
        element: <Navigate to="/" replace />
    }
]);

function App(): ReactElement {
    return <RouterProvider router={router} />;
}

export default App;