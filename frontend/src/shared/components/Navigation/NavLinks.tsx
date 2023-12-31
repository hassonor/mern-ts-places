import { FC, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from "../../context/auth-context.ts";

interface NavLinksProps {
    onNavLinksClick?: () => void;
}

const NavLinks: FC<NavLinksProps> = ({onNavLinksClick}) => {
    const autCtx = useContext(AuthContext);

    return (
        <ul className="list-none m-0 p-0 w-full h-full flex flex-col justify-center items-center lg:flex-row">
            <li className="m-4 lg:mx-2">
                <NavLink
                    to="/"
                    onClick={onNavLinksClick}
                    className={({isActive}) =>
                        isActive
                            ? "border-black bg-yellow-300 text-black no-underline p-2"
                            : "border-transparent text-black no-underline p-2 hover:bg-yellow-300 hover:border-black hover:text-black"
                    }
                >
                    ALL USERS
                </NavLink>
            </li>
            {autCtx.isLoggedIn && <li className="m-4 lg:mx-2">
                <NavLink
                    to={`${autCtx.userId}/places`}
                    onClick={onNavLinksClick}
                    className={({isActive}) =>
                        isActive
                            ? "border-black bg-yellow-300 text-black no-underline p-2"
                            : "border-transparent text-black no-underline p-2 hover:bg-yellow-300 hover:border-black hover:text-black"
                    }
                >
                    MY PLACES
                </NavLink>
            </li>}
            {autCtx.isLoggedIn && <li className="m-4 lg:mx-2">
                <NavLink
                    to="places/new"
                    onClick={onNavLinksClick}
                    className={({isActive}) =>
                        isActive
                            ? "border-black bg-yellow-300 text-black no-underline p-2"
                            : "border-transparent text-black no-underline p-2 hover:bg-yellow-300 hover:border-black hover:text-black"
                    }
                >
                    ADD PLACE
                </NavLink>
            </li>}
            {!autCtx.isLoggedIn && <li className="m-4 lg:mx-2">
                <NavLink
                    to="auth"
                    onClick={onNavLinksClick}
                    className={({isActive}) =>
                        isActive
                            ? "border-black bg-yellow-300 text-black no-underline p-2"
                            : "border-transparent text-black no-underline p-2 hover:bg-yellow-300 hover:border-black hover:text-black"
                    }
                >
                    AUTHENTICATE
                </NavLink>
            </li>}
            {autCtx.isLoggedIn && <li>
                <button
                    className="border-transparent text-black no-underline p-2 hover:bg-yellow-300 hover:border-black hover:text-black"
                    onClick={autCtx.logout}>LOGOUT
                </button>
            </li>}
        </ul>
    );
};

export default NavLinks;
