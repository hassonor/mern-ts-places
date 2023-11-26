import { FC } from "react";

interface LoadingSpinnerProps {
    asOverlay?: boolean;
}

const LoadingSpinner: FC<LoadingSpinnerProps> = ({asOverlay = true}) => {
    const overlayClasses = asOverlay
        ? 'fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50' //
        : 'flex justify-center items-center';

    return (
        <div className={overlayClasses}>
            <div className="border-t-4 border-b-4 border-purple-600 h-16 w-16 rounded-full animate-spin"></div>
        </div>
    );
};

export default LoadingSpinner;