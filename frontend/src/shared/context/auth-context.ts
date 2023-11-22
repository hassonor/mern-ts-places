import { createContext } from "react";

interface AuthContextType {
    isLoggedIn: boolean;
    login: (userId: string, userToken: string, expiration?: string) => void;
    token: string | null;
    userId: string | null;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    login: () => {
    },
    token: null,
    userId: null,
    logout: () => {
    }
});