import { useCallback, useEffect, useState } from "react";

let logoutTimer: ReturnType<typeof setTimeout>
export const useAuth = () => {
    const [token, setToken] = useState<string | null>(null);
    const [tokenExpirationDate, setTokenExpirationDate] = useState<Date | string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);


    const loginAction = useCallback((userId: string, userToken: string, expirationDate?: string) => {
        setToken(userToken);
        setUserId(userId);
        const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
        setTokenExpirationDate(tokenExpirationDate);
        localStorage.setItem("userData", JSON.stringify({userId, token: userToken, expiration: tokenExpirationDate instanceof Date ? tokenExpirationDate.toISOString() : tokenExpirationDate}));
    }, [])

    const logoutAction = useCallback(() => {
        setToken(null);
        setTokenExpirationDate(null);
        setUserId(null);
        localStorage.removeItem("userData");
    }, [])

    useEffect(() => {
        if (token && tokenExpirationDate) {
            const remainingTime = (new Date(tokenExpirationDate)).getTime() - new Date().getTime()
            logoutTimer = setTimeout(logoutAction, remainingTime)
        } else {
            clearTimeout(logoutTimer)
        }
    }, [token, logoutAction, tokenExpirationDate]);


    useEffect(() => {
        const storedData = localStorage.getItem("userData");
        if (storedData) {
            const {token, userId, expiration} = JSON.parse(storedData);
            if (token && new Date(expiration) > new Date()) {
                loginAction(userId, token, expiration);
            }
        }
    }, [loginAction])

    return {token, loginAction, logoutAction, userId};
}