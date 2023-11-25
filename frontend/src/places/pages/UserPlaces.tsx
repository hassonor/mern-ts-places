import { FC } from "react";
import { AxiosResponse } from "axios";
import { useLoaderData } from "react-router-dom";
import PlaceList from "../components/PlaceList.tsx";
import { TUserPlacesResponse } from "../../types/types.ts";

const UserPlaces: FC = () => {
    const response = useLoaderData() as AxiosResponse<TUserPlacesResponse>;
    const {places} = response.data as TUserPlacesResponse;

    return (
        <>
            <PlaceList places={places}/>
        </>
    )
}

export default UserPlaces