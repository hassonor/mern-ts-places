import { FC, ReactElement } from "react";
import UserItem from "./UsersItem.tsx";
import { TUser } from "../../types/types.ts";
import Card from "../../shared/components/UIElements/Card.tsx";

interface UsersListProps {
    users: TUser[];
}

const UsersList: FC<UsersListProps> = ({users}): ReactElement => {
    if (users.length === 0) {
        return (
            <Card>
                <div className="flex justify-center">
                    <h2>No Users found.</h2>
                </div>
            </Card>
        )
    }
    return (
        <ul className="list-none m-0 my-auto p-0 w-9/10 max-w-4xl flex justify-center flex-wrap">
            {users.map((user) => (
                <UserItem
                    key={user._id}
                    user={user}
                />
            ))}
        </ul>
    )
}

export default UsersList;
