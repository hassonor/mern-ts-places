import Pagination from "../../shared/components/Navigation/Pagination.tsx";
import { useLoaderData, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { TUserPlacesResponse } from "../../types/types.ts";
import { FC } from "react";
import PlaceList from "../components/PlaceList.tsx";
import { AxiosResponse } from "axios";

const UserPlaces: FC = () => {
    const response = useLoaderData() as AxiosResponse<TUserPlacesResponse>;
    console.log(response);
    const {places, totalPages} = response.data;
    const [searchParams, setSearchParams] = useSearchParams();
    const {userId} = useParams();
    const navigate = useNavigate();

    const currentPage = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const handlePageChange = (newPage: number) => {
        setSearchParams({page: newPage.toString(), limit: limit.toString()});
    };

    const handleLimitChange = (newLimit: number) => {
        setSearchParams({page: '1', limit: newLimit.toString()});
    };

    const placeDeleteHandler = async () => {
        navigate(`/${userId}/places?page=${currentPage}&limit=${limit}`);
    };

    return (
        <div>
            <div className="flex flex-col items-center justify-center">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    limit={limit}
                    onPageChange={handlePageChange}
                    onLimitChange={handleLimitChange}
                />
            </div>
            <PlaceList places={places} onDelete={placeDeleteHandler}/>
        </div>
    );
};

export default UserPlaces;
