import { redirect } from "react-router-dom";

export function logoutAction() {
    localStorage.removeItem('authData');
    return redirect('/auth?mode=login');
}