import Logger from 'bunyan';
import { BaseCache } from '@service/redis/base.cache';
import { IUserDocument } from '@user/interfaces/user.interface';
import { ServerError } from '@global/helpers/error-handler';
import { config } from '@root/config';
import { Helpers } from '@global/helpers/helpers';

const log: Logger = config.createLogger('userCache');

export class UserCache extends BaseCache {
    constructor() {
        super('userCache');
    }

    public async saveUserToCache(key: string, userUId: string, createdUser: IUserDocument): Promise<void> {
        const createdAt = new Date();
        const {
            _id,
            uId,
            username,
            email,
        } = createdUser;

        const firstList: string[] = [
            '_id', `${_id}`,
            'uId', `${uId}`,
            'username', `${username}`,
            'email', `${email}`,
            'createdAt', `${createdAt}`,
        ];


        const dataToSave: string[] = [...firstList];

        try {
            if (!this.client.isOpen) {
                await this.client.connect();
            }
            await this.client.ZADD('user', {score: parseInt(userUId, 10), value: `${key}`});
            await this.client.HSET(`users:${key}`, dataToSave);
        } catch (error) {
            log.error(error);
            throw new ServerError('Server error. Try again.');
        }
    }

    public async getUserFromCache(key: string): Promise<IUserDocument | null> {
        try {
            if (!this.client.isOpen) {
                await this.client.connect();
            }
            const response: IUserDocument = await this.client.HGETALL(`users:${key}`) as unknown as IUserDocument;
            response.createdAt = new Date(Helpers.parseJson(`${response.createdAt}`));

            return response;
        } catch (error) {
            log.error(error);
            throw new ServerError('Server error. Try again.');
        }

    }

}