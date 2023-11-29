// http-requests.ts
import axios, { AxiosError, AxiosResponse } from "axios";
import { TNewPlaceData } from "../../types/types.ts";


export async function createNewPlace(placeData: TNewPlaceData, token: string): Promise<AxiosResponse<any>> {
    try {
        console.log(placeData);
        const response = await axios.post(`${import.meta.env.VITE_APP_BASE_BE_URL}/places`, placeData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response;

    } catch (err) {
        const error = err as AxiosError;
        throw error;
    }
}
