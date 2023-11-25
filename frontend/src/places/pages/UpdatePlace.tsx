import { FC } from "react";
import { useLoaderData } from "react-router-dom";

import { TPlaceByIdResponse } from "../../types/types.ts";

import { AxiosResponse } from "axios";
import UpdatePlaceForm from "../components/UpdatePlaceForm.tsx";


const UpdatePlace: FC = () => {
    const response = useLoaderData() as AxiosResponse<TPlaceByIdResponse>;
    const {place} = response.data;


    return <UpdatePlaceForm place={place}/>;
}

export default UpdatePlace;