import { Request, Response } from 'express';

import HTTP_STATUS from 'http-status-codes';

const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Shira Yosef',
        email: 'shira@gmail.com',
        password: 'some-password'
    },
    {
        id: 'u2',
        name: 'Or Hasson',
        email: 'hassonor@gmail.com',
        password: 'some-password'
    }
];

export class Get {
    public async users(req: Request, res: Response): Promise<void> {

        res.status(HTTP_STATUS.OK).json({message: 'Users list', users: DUMMY_USERS});

    }
}