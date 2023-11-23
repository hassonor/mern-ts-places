import { FC, ReactElement } from "react";

const Error404: FC = (): ReactElement => {
    return (
        <main className="flex items-center justify-center h-screen bg-gray-100 text-gray-800">
            <div className="text-center">
                <h1 className="text-6xl font-bold">404</h1>
                <p className="text-2xl font-light">Page Not Found</p>
                <p className="mt-4">The page you're looking for doesn't exist or has been moved.</p>
            </div>
        </main>
    );
};

export default Error404;
