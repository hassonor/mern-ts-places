import { FC, ReactElement } from "react";
import { TUser } from "../../types/types.ts";
import Avatar from "../../shared/components/UIElements/Avatar.tsx";
import { Link } from "react-router-dom";
import Card from "../../shared/components/UIElements/Card.tsx";

interface UserItemProps {
    user: TUser;
}

const UserItem: FC<UserItemProps> = ({user}): ReactElement => {
    const placesCount = user.places ? user.places.length : 0;

    return (
        <li className="m-4 min-w-[17.5rem] max-w-[17.5rem]">
            <Card className="p-0">
                <Link to={`/${user._id}/places`}
                      className="flex items-center w-full h-full text-white bg-gray-800 p-4 no-underline hover:bg-yellow-400 active:bg-yellow-400">
                    <div className="w-16 h-16 mr-6">
                        <Avatar image={user.profilePicture} alt={user.username} width="16" height="16"/>
                    </div>
                    <div>
                        <h2 className="text-2xl m-0 font-normal text-red-500  hover:text-gray-800 active:text-gray-800">{user.username}</h2>
                        <h3 className="m-0">
                            {placesCount} {placesCount === 1 ? 'Place' : 'Places'}
                        </h3>
                    </div>
                </Link>
            </Card>
        </li>
    );
};

export default UserItem;
