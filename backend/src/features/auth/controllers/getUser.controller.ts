import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { userService } from '@service/db/user.service';
import { Helpers } from '@global/helpers/helpers';


export class Get {
    public async users(req: Request, res: Response): Promise<void> {
        const {page, limit, sortString, filterString} = Helpers.getQueryParamsWithPagination(req);

        const {users, total} = await userService.getAllUsers(page, limit, sortString, filterString);

        res.status(HTTP_STATUS.OK).json({
            message: 'Users list',
            users,
            total,
            currentPage: page,
            totalPages: Math.ceil(total / limit)
        });
    }
}