import { useState } from 'react';

const useErrorHandling = () => {
    const [error, setError] = useState<string | null>(null);

    const clearError = () => setError(null);

    return {error, setError, clearError};
};

export default useErrorHandling;
