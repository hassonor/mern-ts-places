import {
    IUserDocument,
} from '@user/interfaces/user.interface';
import { UserModel } from '@user/models/user.schema';
import { Types } from 'mongoose';


class UserService {
    public async addUserData(data: IUserDocument): Promise<void> {
        await UserModel.create(data);
    }

    public async getUserById(userId: string): Promise<IUserDocument> {
        const users: IUserDocument[] = await UserModel.aggregate([
            {$match: {_id: new Types.ObjectId(userId)}},
            {$lookup: {from: 'Auth', localField: 'authId', foreignField: '_id', as: 'authId'}},
            {$unwind: '$authId'},
            {$project: this.aggregateProject()}
        ]);
        return users[0];
    }

    public async getUserByAuthId(authId: string): Promise<IUserDocument> {
        const users: IUserDocument[] = await UserModel.aggregate([
            {$match: {authId: new Types.ObjectId(authId)}},
            {$lookup: {from: 'Auth', localField: 'authId', foreignField: '_id', as: 'authId'}},
            {$unwind: '$authId'},
            {$project: this.aggregateProject()}
        ]);
        return users[0];
    }


    private aggregateProject() {
        return {
            _id: 1,
            username: '$authId.username',
            uId: '$authId.uId',
            email: '$authId.email',
            createdAt: '$authId.createdAt'
        };
    }
}

export const userService: UserService = new UserService();