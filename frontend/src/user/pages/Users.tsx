import { FC, ReactElement } from 'react';
import UsersList, { TUser } from "../components/UsersList.tsx";

const DUMMY_USERS: TUser[] = [
    {id: 'u1', name: 'Shira Yosef', imageUrl: "https://ak.picdn.net/shutterstock/videos/7905244/thumb/11.jpg?ip=x480", placeCount: 3},
    {id: 'u2', name: 'Or Hasson', imageUrl: "https://ak.picdn.net/shutterstock/videos/7905244/thumb/11.jpg?ip=x480", placeCount: 2}
]

const UsersPage: FC = (): ReactElement => {

    return (
        <div className="flex justify-center">
            <UsersList items={DUMMY_USERS}/>
        </div>
    )
}

export default UsersPage;