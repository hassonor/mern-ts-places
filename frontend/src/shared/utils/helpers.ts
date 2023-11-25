import { json } from "react-router-dom";

export function validateMode(mode: string) {
    if (mode !== 'login' && mode !== 'signup') {
        throw json({message: 'Invalid mode'}, {status: 422});
    }
}

export function constructAuthData(mode: string, data: { get: (arg0: string) => any; }): { email: string; password: string; username?: string; profilePicture?: string; } {
    if (mode === 'login') {
        return {
            email: data.get('email'),
            password: data.get('password')
        };
    }
    return {
        email: data.get('email'),
        password: data.get('password'),
        username: data.get('username'),
        profilePicture: data.get('base64File')
    };
}