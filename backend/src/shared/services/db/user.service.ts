import {
    IUserDocument, UserFilter, UserSort,
} from '@user/interfaces/user.interface';
import { UserModel } from '@user/models/user.schema';
import { FilterQuery, Types } from 'mongoose';


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
            profilePicture: 1,
            places: 1,
            createdAt: '$authId.createdAt'
        };
    }

    public async getAllUsers(
        page = 1,
        limit = 100,
        sortQuery = '{}',
        filterQuery = '{}'
    ): Promise<{
        users: IUserDocument[],
        total: number
    }> {
        let sort: UserSort;
        let filter: FilterQuery<IUserDocument>;

        try {
            sort = JSON.parse(sortQuery);
            filter = JSON.parse(filterQuery);
        } catch (error) {
            throw new Error('Invalid sort or filter query format');
        }

        const matchQuery = this.buildMatchQuery(filter);
        const sortStage = this.buildSortStage(sort);

        // Aggregate pipeline for counting total documents
        const countPipeline = [
            {$lookup: {from: 'Auth', localField: 'authId', foreignField: '_id', as: 'authId'}},
            {$unwind: '$authId'},
            {$match: matchQuery},
            {$count: 'total'}
        ];

        const totalResults = await UserModel.aggregate(countPipeline);
        const total = totalResults.length > 0 ? totalResults[0].total : 0;

        // Aggregate pipeline for retrieving users
        const userPipeline = [
            {$lookup: {from: 'Auth', localField: 'authId', foreignField: '_id', as: 'authId'}},
            {$unwind: '$authId'},
            {$match: matchQuery},
            {$project: this.aggregateProject()},
            sortStage,
            {$skip: (page - 1) * limit},
            {$limit: limit}
        ];

        const users = await UserModel.aggregate(userPipeline);

        return {users, total};
    }

    private buildMatchQuery(filter: UserFilter): any {
        const matchQuery: any = {};
        if (filter.email) {
            matchQuery['authId.email'] = {$regex: filter.email, $options: 'i'};
        }
        if (filter.username) {
            matchQuery['authId.username'] = {$regex: filter.username, $options: 'i'};
        }
        if (filter.createdAt) {
            matchQuery['authId.createdAt'] = {$gte: new Date(filter.createdAt)};
        }
        return matchQuery;
    }

    private buildSortStage(sort: UserSort): any {
        return Object.keys(sort).length > 0 ? {$sort: sort} : {$sort: {'authId.createdAt': -1}};
    }
}

export const userService: UserService = new UserService();