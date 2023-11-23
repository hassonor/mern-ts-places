import { FC, ReactElement } from "react";
import { useRouteError } from "react-router-dom";

const CustomError: FC = (): ReactElement => {
    const error = useRouteError() as unknown as any;

    let title = 'An error occurred!';
    let message = 'Something went wrong!';

    if (error.status === 500) {
        message = error.data.message;
    }

    if (error.status === 404) {
        title = 'Not found!'
        message = 'Could not find resource of page'
    }
    return (
        <main className="flex items-center justify-center h-screen bg-gray-100 text-gray-800">
            <div className="text-center">
                <h1 className="text-6xl font-bold">500</h1>
                <p className="text-2xl font-light">{title}</p>
                <p className="mt-4">{message}</p>
            </div>
        </main>
    );
}

export default CustomError;