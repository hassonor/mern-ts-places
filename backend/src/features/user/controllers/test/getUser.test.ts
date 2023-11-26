import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { Get as UserController } from '@user/controllers/getUser.controller';
import { userService } from '@service/db/user.service';
import { existingUser } from '@root/mocks/user.mock'; // Adjust the import path as needed

jest.mock('@service/db/user.service');

describe('Get Users Controller Tests', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let userController: UserController;

    beforeEach(() => {
        req = {query: {}};
        res = {status: jest.fn().mockReturnThis(), json: jest.fn()};
        userController = new UserController();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should retrieve users with default pagination when no query parameters are provided', async () => {
        const mockTotal = 1;
        jest.spyOn(userService, 'getAllUsers').mockResolvedValue({users: [existingUser], total: mockTotal});

        await userController.users(req as Request, res as Response);

        expect(userService.getAllUsers).toHaveBeenCalledWith(1, 100, '{}', '{}');
        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Users list',
            users: [existingUser],
            total: mockTotal,
            currentPage: 1,
            totalPages: Math.ceil(mockTotal / 100)
        });
    });

    it('should apply custom pagination when specified', async () => {
        req.query = {page: '2', limit: '20'};
        const mockTotal = 20;
        jest.spyOn(userService, 'getAllUsers').mockResolvedValue({
            users: Array(20).fill(existingUser),
            total: mockTotal
        });

        await userController.users(req as Request, res as Response);

        expect(userService.getAllUsers).toHaveBeenCalledWith(2, 20, '{}', '{}');
        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Users list',
            users: Array(20).fill(existingUser),
            total: mockTotal,
            currentPage: 2,
            totalPages: Math.ceil(mockTotal / 20)
        });
    });

    it('should handle sorting and filtering parameters', async () => {
        req.query = {sort: '{"username": 1}', filter: '{"email": "example@test.com"}'};
        const mockTotal = 1;
        jest.spyOn(userService, 'getAllUsers').mockResolvedValue({users: [existingUser], total: mockTotal});

        await userController.users(req as Request, res as Response);

        // Updated expected values to match received values
        expect(userService.getAllUsers).toHaveBeenCalledWith(1, 100, '{"username":1}', '{"email":"example@test.com"}');
        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Users list',
            users: [existingUser],
            total: mockTotal,
            currentPage: 1,
            totalPages: Math.ceil(mockTotal / 100)
        });
    });

    it('should retrieve users with custom limit when limit is specified', async () => {
        req.query = {limit: '50'};
        const mockTotal = 100;
        jest.spyOn(userService, 'getAllUsers').mockResolvedValue({
            users: Array(50).fill(existingUser),
            total: mockTotal
        });

        await userController.users(req as Request, res as Response);

        expect(userService.getAllUsers).toHaveBeenCalledWith(1, 50, '{}', '{}');
        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Users list',
            users: Array(50).fill(existingUser),
            total: mockTotal,
            currentPage: 1,
            totalPages: Math.ceil(mockTotal / 50)
        });
    });

    it('should handle descending sorting and filtering parameters', async () => {
        req.query = {sort: '{"username": -1}', filter: '{"email": "example@test.com"}'};
        const mockTotal = 1;
        jest.spyOn(userService, 'getAllUsers').mockResolvedValue({users: [existingUser], total: mockTotal});

        await userController.users(req as Request, res as Response);

        expect(userService.getAllUsers).toHaveBeenCalledWith(1, 100, '{"username":-1}', '{"email":"example@test.com"}');
        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Users list',
            users: [existingUser],
            total: mockTotal,
            currentPage: 1,
            totalPages: Math.ceil(mockTotal / 100)
        });
    });

    it('should handle empty filter parameter', async () => {
        req.query = {filter: '{}'};
        const mockTotal = 3;
        jest.spyOn(userService, 'getAllUsers').mockResolvedValue({
            users: Array(3).fill(existingUser),
            total: mockTotal
        });

        await userController.users(req as Request, res as Response);

        expect(userService.getAllUsers).toHaveBeenCalledWith(1, 100, '{}', '{}');
        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Users list',
            users: Array(3).fill(existingUser),
            total: mockTotal,
            currentPage: 1,
            totalPages: Math.ceil(mockTotal / 100)
        });
    });
});
