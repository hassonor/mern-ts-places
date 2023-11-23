import { FC, ReactElement } from 'react';
import { useLoaderData, useSearchParams } from "react-router-dom";
import UsersList from "../components/UsersList.tsx";
import { TLimitOptions, TUsersResponse } from "../../types/types.ts";
import Pagination from "../../shared/components/Navigation/Pagination.tsx";

const UsersPage: FC = (): ReactElement => {
    const {users, totalPages} = useLoaderData() as TUsersResponse;
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '100') as TLimitOptions;

    const handlePageChange = (newPage: number) => {
        setSearchParams({page: newPage.toString(), limit: limit.toString()});
    };

    const handleLimitChange = (newLimit: TLimitOptions) => {
        setSearchParams({page: '1', limit: newLimit.toString()});
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                limit={limit}
                onPageChange={handlePageChange}
                onLimitChange={handleLimitChange}
            />
            <UsersList users={users}/>
        </div>
    );
};

export default UsersPage;
