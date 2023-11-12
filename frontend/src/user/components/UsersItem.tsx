import { FC, ReactElement } from "react";
import { TUser } from "../../types/types.ts";
import Avatar from "../../shared/components/UIElements/Avatar.tsx";
import { Link } from "react-router-dom";
import Card from "../../shared/components/UIElements/Card.tsx";

interface UserItemProps {
    user: TUser;
}

const UserItem: FC<UserItemProps> = ({user}): ReactElement => {
    return (
        <li className="m-4 w-[calc(45%-2rem)] min-w-[17.5rem]">
            <Card className="p-0">
                <Link to={`/${user.id}/places`}
                      className="flex items-center w-full h-full text-white bg-gray-800 p-4 no-underline hover:bg-yellow-400 active:bg-yellow-400">
                    <div className="w-16 h-16 mr-6">
                        <Avatar image={user.image} alt={user.name} width="16" height="16"/>
                    </div>
                    <div>
                        <h2 className="text-2xl m-0 font-normal text-yellow-400 hover:text-gray-800 active:text-gray-800">{user.name}</h2>
                        <h3 className="m-0">
                            {user.placeCount} {user.placeCount === 1 ? 'Place' : 'Places'}
                        </h3>
                    </div>
                </Link>
            </Card>
        </li>
    );
};

export default UserItem;
