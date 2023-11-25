import axios from "axios";
import { json, redirect } from 'react-router-dom';


export async function addNewPlaceAction({request, params}) {
    try {
        const {userId} = params;
        const data = await request.formData();


        const placeData = {
            title: data.get('title'),
            description: data.get('description'),
            address: data.get('address'),
            image: data.get('base64File')
        };

        const headers = {Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTVlZjVhYTkxYTliMjBkY2M2MzBhMTYiLCJ1SWQiOiI2Njc3OTAwNDI5NjAiLCJlbWFpbCI6Im9yaGFzc29uMjAyMUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6Ik9yaGFzc29uMjAyMSIsImlhdCI6MTcwMDkwNzQxNSwiZXhwIjoxNzAwOTExMDE1fQ.hogHZZsAkKwHu0JU1wUOyCiHk4VMaCJz5vhMuHq1hSc`}
        const response = await axios.post(`${import.meta.env.VITE_APP_BASE_BE_URL}/places`, placeData, {headers});


        if (response.status !== 201) {
            throw json({message: 'Failed to create a new place'}, {status: 500});
        }

        return redirect(`/${userId}/places`);
    } catch (error) {
        throw new Error('Failed to create a new place');
    }
}


export async function deletePlaceAction({request, params}) {
    try {
        const {userId} = params;
        const data = await request.formData();
        const placeId = data.get('placeId');

        const headers = {Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTVlZjVhYTkxYTliMjBkY2M2MzBhMTYiLCJ1SWQiOiI2Njc3OTAwNDI5NjAiLCJlbWFpbCI6Im9yaGFzc29uMjAyMUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6Ik9yaGFzc29uMjAyMSIsImlhdCI6MTcwMDkwNzQxNSwiZXhwIjoxNzAwOTExMDE1fQ.hogHZZsAkKwHu0JU1wUOyCiHk4VMaCJz5vhMuHq1hSc`}
        const response = await axios.delete(`${import.meta.env.VITE_APP_BASE_BE_URL}/places/${placeId}`, {headers});

        console.log(response);

        if (response.status !== 204) {
            throw json({message: 'Failed to delete a place'}, {status: 500});
        }

        return redirect(`/${userId}/places`);

    } catch (error) {
        throw new Error('Failed to delete a place');
    }
}
