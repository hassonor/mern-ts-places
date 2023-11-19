import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";

interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute: FC<PrivateRouteProps> = ({children}) => {
    const {isLoggedIn} = useContext(AuthContext);


    return isLoggedIn ? children : <Navigate to="/auth"/>;
};

export default PrivateRoute;
