import { FC, Suspense } from "react";
import { useLoaderData, Await } from "react-router-dom";
import { TPlaceByIdResponse } from "../../types/types.ts";

import UpdatePlaceForm from "../components/UpdatePlaceForm.tsx";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner.tsx";


const UpdatePlace: FC = () => {
    const {place} = useLoaderData() as Partial<TPlaceByIdResponse>;


    return (
        <Suspense fallback={<LoadingSpinner asOverlay/>}>
            <Await resolve={place}>
                {(loadedPlace) => <UpdatePlaceForm place={loadedPlace}/>}
            </Await>
        </Suspense>
    )

}

export default UpdatePlace;