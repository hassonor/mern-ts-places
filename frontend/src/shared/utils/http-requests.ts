import axios from "axios";
import { ISearchParams, TUsersResponse } from "../../types/types.ts";

export async function fetchUsersLoader(search: ISearchParams): Promise<TUsersResponse> {
    try {
        // Extracting the URL from the search object
        const url = new URL(search.request.url);
        // Getting the search parameters from the URL
        const queryString = url.search;

        const response = await axios.get(`${import.meta.env.VITE_APP_BASE_BE_URL}/users${queryString}`);
        return response.data as TUsersResponse;
    } catch (error) {
        throw new Error('Failed to load users');
    }
}