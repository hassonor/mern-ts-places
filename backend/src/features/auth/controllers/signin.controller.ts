import { Request, Response } from 'express';
import { config } from '@root/config';
import JWT from 'jsonwebtoken';
import { JoiValidation } from '@global/decorators/joi-validation.decorators';
import HTTP_STATUS from 'http-status-codes';
import { authService } from '@service/db/auth.service';
import { loginSchema } from '@auth/schemes/signin';
import { IAuthDocument } from '@auth/interfaces/auth.interface';
import { BadRequestError } from '@global/helpers/error-handler';
import { userService } from '@service/db/user.service';
import { IUserDocument } from '@user/interfaces/user.interface';


export class SignInController {
    @JoiValidation(loginSchema)
    public async read(req: Request, res: Response): Promise<void> {
        const {email, username, password} = req.body;
        let existingUser: IAuthDocument;
        
        if (email) {
            existingUser = await authService.getAuthUserByEmail(email);
        } else {
            existingUser = await authService.getAuthUserByUsername(username);
        }

        if (!existingUser) {
            throw new BadRequestError('Invalid credentials');
        }

        const passwordsMatch: boolean = await existingUser.comparePassword(password);
        if (!passwordsMatch) {
            throw new BadRequestError('Invalid credentials');
        }
        const user: IUserDocument = await userService.getUserByAuthId(`${existingUser._id}`);
        const userJwt: string = JWT.sign(
            {
                userId: user._id,
                uId: existingUser.uId,
                email: existingUser.email,
                username: existingUser.username,
            },
            config.JWT_TOKEN!, {expiresIn: config.TOKEN_EXPIRES_IN_HOURS}
        );

        const userDocument: IUserDocument = {
            ...user,
            authId: existingUser!._id,
            username: existingUser!.username,
            email: existingUser!.email,
            uId: existingUser!.uId,
            createdAt: existingUser!.createdAt
        } as IUserDocument;


        req.session = {jwt: userJwt};
        res.status(HTTP_STATUS.OK).json({message: 'User login successfully', user: userDocument, token: userJwt});
    }
}