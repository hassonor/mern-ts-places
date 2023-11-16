import axios from 'axios';
import { config } from '@root/config';
import { NotFoundError } from '@global/helpers/error-handler';

export async function getCoordsForAddress(address: string) {
    const apiKey = config.GOOGLE_GEOCODING_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    const response = await axios.get(url);

    const data = response.data;

    if (!data || data.status === 'ZERO_RESULTS' || data.status === 'REQUEST_DENIED') {
        throw new Error();
    }


    const coordinates = data.results[0].geometry.location;

    return coordinates;


}