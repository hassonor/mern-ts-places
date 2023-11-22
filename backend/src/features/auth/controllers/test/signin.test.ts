/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import JWT from 'jsonwebtoken';
import { config } from '@root/config';
import { CustomError } from '@global/helpers/error-handler';
import { SignInController } from '@auth/controllers/signin.controller';
import { Helpers } from '@global/helpers/helpers';
import { authService } from '@service/db/auth.service';
import { userService } from '@service/db/user.service';
import { authMock, authMockRequest, authMockResponse } from '@root/mocks/auth.mock';
import { mergedAuthAndUserData } from '@root/mocks/user.mock';

const USERNAME = 'Manny';
const PASSWORD = 'manny1234567';
const WRONG_USERNAME = 'ma';
const WRONG_PASSWORD = 'ma';
const LONG_PASSWORD = 'mathematics1';
const LONG_USERNAME = 'mathematics';

jest.useFakeTimers();
jest.mock('@service/queues/base.queue');

describe('SignIn', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
    });

    it('should throw an error if username is not available', () => {
        const req: Request = authMockRequest({}, {username: '', password: PASSWORD}) as Request;
        const res: Response = authMockResponse();
        SignInController.prototype.read(req, res).catch((error: CustomError) => {
            expect(error.statusCode).toEqual(400);
            expect(error.serializeErrors().message).toEqual('Username is a required field');
        });
    });

    it('should throw an error if username length is less than minimum length', () => {
        const req: Request = authMockRequest({}, {username: WRONG_USERNAME, password: WRONG_PASSWORD}) as Request;
        const res: Response = authMockResponse();
        SignInController.prototype.read(req, res).catch((error: CustomError) => {
            expect(error.statusCode).toEqual(400);
            expect(error.serializeErrors().message).toEqual('Invalid username');
        });
    });

    it('should throw an error if username length is greater than maximum length', () => {
        const req: Request = authMockRequest({}, {username: LONG_USERNAME, password: WRONG_PASSWORD}) as Request;
        const res: Response = authMockResponse();
        SignInController.prototype.read(req, res).catch((error: CustomError) => {
            expect(error.statusCode).toEqual(400);
            expect(error.serializeErrors().message).toEqual('Invalid password');
        });
    });

    it('should throw an error if password is not available', () => {
        const req: Request = authMockRequest({}, {username: USERNAME, password: ''}) as Request;
        const res: Response = authMockResponse();
        SignInController.prototype.read(req, res).catch((error: CustomError) => {
            expect(error.statusCode).toEqual(400);
            expect(error.serializeErrors().message).toEqual('Password is a required field');
        });
    });

    it('should throw an error if password length is less than minimum length', () => {
        const req: Request = authMockRequest({}, {username: USERNAME, password: WRONG_PASSWORD}) as Request;
        const res: Response = authMockResponse();
        SignInController.prototype.read(req, res).catch((error: CustomError) => {
            expect(error.statusCode).toEqual(400);
            expect(error.serializeErrors().message).toEqual('Invalid password');
        });
    });

    it('should throw an error if password length is greater than maximum length', () => {
        const req: Request = authMockRequest({}, {username: USERNAME, password: LONG_PASSWORD}) as Request;
        const res: Response = authMockResponse();
        SignInController.prototype.read(req, res).catch((error: CustomError) => {
            expect(error.statusCode).toEqual(400);
            expect(error.serializeErrors().message).toEqual('Invalid password');
        });
    });

    it('should throw "Invalid credentials" if username does not exist', () => {
        const req: Request = authMockRequest({}, {username: USERNAME, password: PASSWORD}) as Request;
        const res: Response = authMockResponse();
        jest.spyOn(authService, 'getAuthUserByUsername').mockResolvedValueOnce(null as any);

        SignInController.prototype.read(req, res).catch((error: CustomError) => {
            expect(authService.getAuthUserByUsername).toHaveBeenCalledWith(Helpers.firstLetterUppercase(req.body.username));
            expect(error.statusCode).toEqual(400);
            expect(error.serializeErrors().message).toEqual('Invalid credentials');
        });
    });

    it('should throw "Invalid credentials" if password does not match', () => {
        const req: Request = authMockRequest({}, {username: USERNAME, password: PASSWORD}) as Request;
        const res: Response = authMockResponse();
        jest.spyOn(authService, 'getAuthUserByUsername').mockResolvedValueOnce(authMock);
        authMock.comparePassword = () => Promise.resolve(false);

        SignInController.prototype.read(req, res).catch((error: CustomError) => {
            expect(authService.getAuthUserByUsername).toHaveBeenCalledWith(Helpers.firstLetterUppercase(req.body.username));
            expect(error.statusCode).toEqual(400);
            expect(error.serializeErrors().message).toEqual('Invalid credentials');
        });
    });

    it('should send correct json response with valid token for valid credentials', async () => {
        const req: Request = authMockRequest({}, {username: USERNAME, password: PASSWORD}) as Request;
        const res: Response = authMockResponse();
        authMock.comparePassword = () => Promise.resolve(true);
        jest.spyOn(authService, 'getAuthUserByUsername').mockResolvedValue(authMock);
        jest.spyOn(userService, 'getUserByAuthId').mockResolvedValue(mergedAuthAndUserData);

        await SignInController.prototype.read(req, res);

        // Generate the expected token
        const expectedToken = JWT.sign(
            {
                userId: mergedAuthAndUserData._id.toString(),
                uId: authMock.uId,
                email: authMock.email,
                username: authMock.username,
            },
            config.JWT_TOKEN!,
            {expiresIn: config.TOKEN_EXPIRES_IN_HOURS}
        );

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'User login successfully',
            user: mergedAuthAndUserData,
            token: expectedToken
        });
    });

});
