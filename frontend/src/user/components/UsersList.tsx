import { FC, ReactElement } from "react";
import UserItem from "./UsersItem.tsx";
import { TUser } from "../../types/types.ts";

interface UsersListProps {
    items: TUser[];
}

const UsersList: FC<UsersListProps> = ({items}): ReactElement => {
    if (items.length === 0) {
        return (
            <div className="flex justify-center">
                <h2>No Users found.</h2>
            </div>
        )
    }
    return (
        <ul className="list-none m-0 my-auto p-0 w-9/10 max-w-4xl flex justify-center flex-wrap">
            {items.map((user) => (
                <UserItem
                    key={user.id}
                    user={user}
                />
            ))}
        </ul>
    )
}

export default UsersList;
