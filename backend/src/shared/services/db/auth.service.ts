import { IAuthDocument } from '@auth/interfaces/auth.interface';
import { AuthModel } from '@auth/models/auth.schema';
import { Helpers } from '@global/helpers/helpers';
import { Types } from 'mongoose';
import { IUserDocument } from '@user/interfaces/user.interface';
import { UserModel } from '@user/models/user.schema';

class AuthService {
    public async createAuthUser(data: IAuthDocument): Promise<void> {
        await AuthModel.create(data);
    }

    public async updatePasswordToken(authId: string, token: string, tokenExpiration: number): Promise<void> {
        await AuthModel.updateOne(
            {_id: authId},
            {
                passwordResetToken: token,
                passwordResetExpires: tokenExpiration
            }
        );
    }

    public async getUserByUsernameOrEmail(username: string, email: string): Promise<IAuthDocument> {
        const query = {
            $or: [{username: Helpers.firstLetterUppercase(username)}, {email: Helpers.lowerCase(email)}]
        };
        const user: IAuthDocument = (await AuthModel.findOne(query).exec()) as IAuthDocument;
        return user;
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

    public async getAuthUserByUsername(username: string): Promise<IAuthDocument> {
        const user: IAuthDocument = (await AuthModel.findOne({username: Helpers.firstLetterUppercase(username)}).exec()) as IAuthDocument;
        return user;
    }

    public async getAuthUserByEmail(email: string): Promise<IAuthDocument> {
        const user: IAuthDocument = (await AuthModel.findOne({email: Helpers.lowerCase(email)}).exec()) as IAuthDocument;
        return user;
    }

    public async getAuthUserByPasswordToken(token: string): Promise<IAuthDocument> {
        const user: IAuthDocument = (await AuthModel.findOne({
            passwordResetToken: token,
            passwordResetExpires: {$gt: Date.now()}
        }).exec()) as IAuthDocument;
        return user;
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

export const authService: AuthService = new AuthService();