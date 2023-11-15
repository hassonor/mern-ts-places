import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context.ts";

const PrivateRoute = ({children}) => {
    const {isLoggedIn} = useContext(AuthContext);
    
    return isLoggedIn ? children : <Navigate to="/auth"/>;
};

export default PrivateRoute;