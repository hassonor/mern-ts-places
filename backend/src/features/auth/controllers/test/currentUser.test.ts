import { Request, Response } from 'express';
import { authMockRequest, authMockResponse, authUserPayload } from '@root/mocks/auth.mock';
import { existingUser } from '@root/mocks/user.mock';
import { CurrentUserController } from '@auth/controllers/currentUser.controller';
import { IUserDocument } from '@user/interfaces/user.interface';
import { userService } from '@service/db/user.service';
import HTTP_STATUS from 'http-status-codes';

jest.mock('@service/queues/base.queue');
jest.mock('@service/redis/user.cache');
jest.mock('@service/db/user.service');

const USERNAME = 'Manny';
const PASSWORD = 'manny1';

describe('CurrentUser', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('token', () => {
        it('should set session token to null and send correct json response', async () => {
            const req: Request = authMockRequest({}, {
                username: USERNAME,
                password: PASSWORD
            }, authUserPayload) as Request;
            const res: Response = authMockResponse();
            jest.spyOn(userService, 'getUserById').mockResolvedValue({} as IUserDocument);

            await CurrentUserController.prototype.read(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                token: null,
                isUser: false,
                user: null
            });
        });

        it('should set session token and send correct json response', async () => {
            const req: Request = authMockRequest({jwt: '12djdj34'}, {
                username: USERNAME,
                password: PASSWORD
            }, authUserPayload) as Request;
            const res: Response = authMockResponse();

            jest.spyOn(userService, 'getUserById').mockResolvedValue(existingUser as IUserDocument);

            await CurrentUserController.prototype.read(req, res);

            expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(res.json).toHaveBeenCalledWith({
                token: req.session?.jwt,
                isUser: true,
                user: existingUser
            });
        });
    });
});