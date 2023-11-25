import axios from "axios";
import { json } from 'react-router-dom';
import { ISearchParams } from "../../types/types.ts";

export async function fetchUsersLoader(search: ISearchParams): Promise<any> {
    try {
        // Extracting the URL from the search object
        const url = new URL(search.request.url);
        // Getting the search parameters from the URL
        const queryString = url.search;

        const response = await axios.get(`${import.meta.env.VITE_APP_BASE_BE_URL}/users${queryString}`);

        if (response.status !== 200) {
            return json({message: 'Failed to load users'}, {status: 500});
        }

        return response
    } catch (error) {
        throw new Error('Failed to load users');
    }
}

export async function fetchUserPlacesLoader({params}): Promise<any> {
    try {
        const userId = params.userId;
        const response = await axios.get(`${import.meta.env.VITE_APP_BASE_BE_URL}/places/user/${userId}`);

        if (response.status !== 200) {
            return json({message: 'Failed to load places for this user'}, {status: 500});
        }

        return response
    } catch (error) {
        throw new Error('Failed to load places');
    }
}

export async function fetchUserPlaceByIdLoader({params}): Promise<any> {
    try {
        const {placeId} = params;
        const response = await axios.get(`${import.meta.env.VITE_APP_BASE_BE_URL}/places/${placeId}`);

        if (response.status !== 200) {
            return json({message: 'Failed to load place details'}, {status: 500});
        }

        return response
    } catch (error) {
        throw new Error('Failed to load place details');
    }
}