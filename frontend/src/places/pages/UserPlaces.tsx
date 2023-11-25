import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TPlace, TUserPlacesResponse } from "../../types/types.ts";
import PlaceList from "../components/PlaceList.tsx";
import useHttpClient from "../../shared/hooks/http-hook.ts";
import ErrorModal from "../../shared/components/UIElements/ErrorModal.tsx";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner.tsx";

const UserPlaces: FC = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedPlaces, setLoadedPlaces] = useState<TPlace[]>([]);
    const userId = useParams().userId;

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const response = await sendRequest<TPlace[]>(`${import.meta.env.VITE_APP_BASE_BE_URL}/places/user/${userId}`) as unknown as TUserPlacesResponse;
                setLoadedPlaces(response.places);
            } catch (err) {
                // Error handling
            }
        };

        // Trigger fetchPlaces when 'refresh' query param is 'true' or when userId changes

        fetchPlaces();

    }, [sendRequest, userId]);


    const placeDeleteHandler = async (deletedPlaceId: string) => {
        setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place._id !== deletedPlaceId));
    }

    return (
        <>
            {error && <ErrorModal error={error} onClear={clearError}/>}
            {isLoading && <div className="mx-auto p-1 w-8/10 max-w-xl"><LoadingSpinner/></div>}
            {!isLoading && loadedPlaces && <PlaceList places={loadedPlaces} onDelete={placeDeleteHandler}/>}
        </>
    );
}

export default UserPlaces;
