import { Request, Response } from 'express';
import { IUserDocument } from '@user/interfaces/user.interface';
import { userService } from '@service/db/user.service';
import HTTP_STATUS from 'http-status-codes';

export class CurrentUserController {
    public async read(req: Request, res: Response): Promise<void> {
        let isUser = false;
        let token = null;
        let user = null;

        const existingUser: IUserDocument = await userService.getUserById(`${req.currentUser!.userId}`) as IUserDocument;
        if (Object.keys(existingUser).length) {
            isUser = true;
            token = req.session?.jwt;
            user = existingUser;
        }
        res.status(HTTP_STATUS.OK).json({token, isUser, user});

    }
}