/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import * as cloudinaryUploads from '@global/helpers/cloudinary-upload';
import { SignupController } from '@auth/controllers/signup.controller';
import { CustomError } from '@global/helpers/error-handler';
import { authService } from '@service/db/auth.service';
import { authMock, authMockRequest, authMockResponse } from '@root/mocks/auth.mock';


jest.useFakeTimers();
jest.mock('@service/queues/base.queue');
jest.mock('@service/queues/user.queue');
jest.mock('@service/queues/auth.queue');
jest.mock('@global/helpers/cloudinary-upload');

describe('SignUp', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
    });

    it('should throw an error if username is not available', () => {
        const req: Request = authMockRequest(
            {},
            {
                username: '',
                email: 'orh@google.com',
                password: 'qwerty1234214',
                profilePicture: 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ=='
            }
        ) as Request;
        const res: Response = authMockResponse();

        SignupController.prototype.create(req, res).catch((error: CustomError) => {
            expect(error.statusCode).toEqual(400);
            expect(error.serializeErrors().message).toEqual('Username is a required field');
        });
    });

    it('should throw an error if username length is less than minimum length', () => {
        const req: Request = authMockRequest(
            {},
            {
                username: 'ma',
                email: 'orh@google.com',
                password: 'qwerty23141423',
                profilePicture: 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ=='
            }
        ) as Request;
        const res: Response = authMockResponse();
        SignupController.prototype.create(req, res).catch((error: CustomError) => {
            expect(error.statusCode).toEqual(400);
            expect(error.serializeErrors().message).toEqual('Invalid username');
        });
    });

    it('should throw an error if username length is greater than maximum length', () => {
        const req: Request = authMockRequest(
            {},
            {
                username: 'mathematics312342423423324234432234234',
                email: 'orh@google.com',
                password: 'qwerty12442',
                profilePicture: 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ=='
            }
        ) as Request;
        const res: Response = authMockResponse();
        SignupController.prototype.create(req, res).catch((error: CustomError) => {
            expect(error.statusCode).toEqual(400);
            expect(error.serializeErrors().message).toEqual('Invalid username');
        });
    });

    it('should throw an error if email is not valid', () => {
        const req: Request = authMockRequest(
            {},
            {
                username: 'hassonor',
                email: 'not valid',
                password: 'qwerty123123',
                profilePicture: 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ=='
            }
        ) as Request;
        const res: Response = authMockResponse();

        SignupController.prototype.create(req, res).catch((error: CustomError) => {
            expect(error.statusCode).toEqual(400);
            expect(error.serializeErrors().message).toEqual('Email must be valid');
        });
    });

    it('should throw an error if email is not available', () => {
        const req: Request = authMockRequest(
            {},
            {
                username: 'hassonor',
                email: '',
                password: 'qwerty123123',
                profilePicture: 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ=='
            }
        ) as Request;
        const res: Response = authMockResponse();
        SignupController.prototype.create(req, res).catch((error: CustomError) => {
            expect(error.statusCode).toEqual(400);
            expect(error.serializeErrors().message).toEqual('Email is a required field');
        });
    });

    it('should throw an error if password is not available', () => {
        const req: Request = authMockRequest(
            {},
            {
                username: 'hassonor',
                email: 'orh@google.com',
                password: '',
                profilePicture: 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ=='
            }
        ) as Request;
        const res: Response = authMockResponse();
        SignupController.prototype.create(req, res).catch((error: CustomError) => {
            expect(error.statusCode).toEqual(400);
            expect(error.serializeErrors().message).toEqual('Password is a required field');
        });
    });

    it('should throw an error if password length is less than minimum length', () => {
        const req: Request = authMockRequest(
            {},
            {
                username: 'hassonor',
                email: 'orh@google.com',
                password: 'ma',
                profilePicture: 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ=='
            }
        ) as Request;
        const res: Response = authMockResponse();
        SignupController.prototype.create(req, res).catch((error: CustomError) => {
            expect(error.statusCode).toEqual(400);
            expect(error.serializeErrors().message).toEqual('Invalid password');
        });
    });

    it('should throw an error if password length is greater than maximum length', () => {
        const req: Request = authMockRequest(
            {},
            {
                username: 'hassonor',
                email: 'orh@google.com',
                password: 'mathematics1',
                profilePicture: 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ=='
            }
        ) as Request;
        const res: Response = authMockResponse();
        SignupController.prototype.create(req, res).catch((error: CustomError) => {
            expect(error.statusCode).toEqual(400);
            expect(error.serializeErrors().message).toEqual('Invalid password');
        });
    });

    it('should throw unauthorized error is user already exist', () => {
        const req: Request = authMockRequest(
            {},
            {
                username: 'hassonor',
                email: 'orh@google.com',
                password: 'qwerty123123',
                profilePicture: 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ=='
            }
        ) as Request;
        const res: Response = authMockResponse();

        jest.spyOn(authService, 'getUserByUsernameOrEmail').mockResolvedValue(authMock);
        SignupController.prototype.create(req, res).catch((error: CustomError) => {
            expect(error.statusCode).toEqual(400);
            expect(error.serializeErrors().message).toEqual('The user already exist');
        });
    });

    it('should set session data for valid credentials and send correct json response', async () => {
        const req: Request = authMockRequest(
            {},
            {
                username: 'hassonor',
                email: 'orh@google.com',
                password: 'qwerty343421432',
                profilePicture: 'data:image/png;base64,...' // Your base64 image string
            }
        ) as Request;
        const res: Response = authMockResponse();

        // Mock the relevant functions
        jest.spyOn(authService, 'getUserByUsernameOrEmail').mockResolvedValue(null as any);

        jest.spyOn(cloudinaryUploads, 'uploads').mockImplementation((): any => Promise.resolve({
            version: '1234737373',
            public_id: '123456'
        }));

        await SignupController.prototype.create(req, res);


        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            message: 'User were created successfully',
            user: expect.any(Object),
            token: expect.any(String)
        }));
    });

});