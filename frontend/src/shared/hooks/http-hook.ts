import { useState, useCallback, useEffect, useRef } from 'react';
import axios, { AxiosError, AxiosRequestHeaders, Method, CancelTokenSource } from 'axios';

interface ErrorResponse {
    message?: string;
}

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const activeAxiosTokens = useRef<CancelTokenSource[]>([]);

    const sendRequest = useCallback(
        async <T = unknown, R = unknown>(
            url: string,
            method: Method = 'GET',
            body?: T,
            headers?: AxiosRequestHeaders | { Authorization: string },
        ): Promise<R> => {
            setIsLoading(true);

            // Cancel all active requests
            activeAxiosTokens.current.forEach(token => token.cancel('A new request was made.'));
            activeAxiosTokens.current = [];

            const cancelTokenSource = axios.CancelToken.source();
            activeAxiosTokens.current.push(cancelTokenSource); // Add new token to the array

            try {
                const response = await axios({
                    method,
                    url,
                    data: body,
                    headers: body instanceof FormData ? undefined : headers,
                    cancelToken: cancelTokenSource.token
                });
                return response.data as R;
            } catch (err) {
                if (!axios.isCancel(err)) {
                    const axiosErr = err as AxiosError<ErrorResponse>;
                    setError(axiosErr.response?.data?.message || axiosErr.message || 'An error occurred');
                }
                throw err;
            } finally {
                setIsLoading(false);
                // Remove the token related to this request
                activeAxiosTokens.current = activeAxiosTokens.current.filter(token => token !== cancelTokenSource);
            }
        },
        []
    );

    const clearError = (): void => {
        setError(null);
    };

    useEffect(() => {
        return () => {
            // Cancel all active requests on component unmount
            activeAxiosTokens.current.forEach(token => token.cancel('Component unmounted.'));
            activeAxiosTokens.current = [];
        };
    }, []);

    return {isLoading, error, sendRequest, clearError};
};

export default useHttpClient;
