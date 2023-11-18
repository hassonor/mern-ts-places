import { FC, ReactElement } from 'react';
import { TUser } from "../../types/types.ts";
import UsersList from "../components/UsersList.tsx";


const DUMMY_USERS: TUser[] = [
    {
        id: 'u1',
        username: 'Shira Yosef',
        imageUrl: "https://ak.picdn.net/shutterstock/videos/7905244/thumb/11.jpg?ip=x480",
        placeCount: 3
    },
    {
        id: 'u2',
        username: 'Or Hasson',
        imageUrl: "https://ak.picdn.net/shutterstock/videos/7905244/thumb/11.jpg?ip=x480",
        placeCount: 2
    }
]

const UsersPage: FC = (): ReactElement => {

    return (
        <div className="flex justify-center">
            <UsersList items={DUMMY_USERS}/>
        </div>
    )
}

export default UsersPage;