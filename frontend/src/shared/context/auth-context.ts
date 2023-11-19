import { createContext } from "react";

interface AuthContextType {
    isLoggedIn: boolean;
    login: (userId: string, userToken: string) => void;
    userId: string | null;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    login: () => {
    },
    userId: null,
    logout: () => {
    }
});