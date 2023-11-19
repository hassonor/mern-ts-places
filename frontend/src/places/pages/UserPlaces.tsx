import { FC, useEffect, useState } from "react";
import { TPlace, TUserPlacesResponse } from "../../types/types.ts";
import PlaceList from "../components/PlaceList.tsx";
import { useParams } from "react-router-dom";
import useHttpClient from "../../shared/hooks/http-hook.ts";
import ErrorModal from "../../shared/components/UIElements/ErrorModal.tsx";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner.tsx";


const UserPlaces: FC = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedPlaces, setLoadedPlaces] = useState<TPlace[]>([]);

    const userId: string | undefined = useParams().userId;

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const response = await sendRequest<TPlace[]>(`http://localhost:5000/api/v1/places/user/${userId}`) as unknown as TUserPlacesResponse;
                setLoadedPlaces(response.places);
            } catch (err) {
                // Error handling is managed by useHttpClient
            }
        };
        fetchPlaces();
    }, [sendRequest, userId])

    return (
        <>
            {error && <ErrorModal error={error} onClear={clearError}/>}
            {isLoading && <div className="mx-auto p-1 w-8/10 max-w-xl"><LoadingSpinner/></div>}
            {!isLoading && loadedPlaces && <PlaceList places={loadedPlaces}/>}
        </>
    )
}

export default UserPlaces