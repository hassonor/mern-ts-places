import { redirect } from "react-router-dom";

export function getTokenDuration() {
    const storedExpiration = localStorage.getItem('expiration');
    const expirationDate = new Date(<string>storedExpiration);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
}

export function getAuthData() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token) {
        return null;
    }

    const tokenDuration = getTokenDuration();

    if (tokenDuration < 0) {
        return 'EXPIRED';
    }

    return {token, userId};
}

export function authDataLoader() {
    return getAuthData()
}


export async function checkAuthLoader() {
    const token = getAuthData();

    if (!token) {
        return redirect('/auth');
    }

    return null;
}