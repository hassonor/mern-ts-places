import { FC, ReactElement, useEffect, useState } from 'react';
import UsersList from "../components/UsersList.tsx";
import { TUsersResponse, TUser } from "../../types/types.ts";
import ErrorModal from "../../shared/components/UIElements/ErrorModal.tsx";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner.tsx";
import useHttpClient from "../../shared/hooks/http-hook.ts"; // Import useHttpClient

const UsersPage: FC = (): ReactElement => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedUsers, setLoadedUsers] = useState<TUser[]>([]);


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await sendRequest<TUsersResponse>(`${import.meta.env.VITE_APP_BASE_BE_URL}/users`) as unknown as TUsersResponse;
                setLoadedUsers(response.users);
            } catch (err) {
                // Error handling is managed by useHttpClient
            }
        };

        fetchUsers();
    }, [sendRequest]);

    return (
        <div className="flex justify-center">
            {error && <ErrorModal error={error} onClear={clearError}/>}
            {isLoading ? (
                <LoadingSpinner asOverlay/>
            ) : (
                <UsersList users={loadedUsers}/>
            )}
        </div>
    );
}

export default UsersPage;
