import { ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import JWT from 'jsonwebtoken';
import HTTP_STATUS from 'http-status-codes';
import { JoiValidation } from '@global/decorators/joi-validation.decorators';
import { signupSchema } from '@auth/schemes/signup';
import { IAuthDocument, ISignUpData } from '@auth/interfaces/auth.interface';
import { authService } from '@service/db/auth.service';
import { BadRequestError } from '@global/helpers/error-handler';
import { Helpers } from '@global/helpers/helpers';
import { UploadApiResponse } from 'cloudinary';
import { uploads } from '@global/helpers/cloudinary-upload';
import { IUserDocument } from '@user/interfaces/user.interface';
import { config } from '@root/config';
import { authQueue } from '@service/queues/auth.queue';
import { userQueue } from '@service/queues/user.queue';
import { Types } from 'mongoose';

export class SignupController {
    @JoiValidation(signupSchema)
    public async create(req: Request, res: Response): Promise<void> {
        const {username, email, password, places} = req.body;

        const checkIfUserExist: IAuthDocument = await authService.getUserByUsernameOrEmail(username, email);
        if (checkIfUserExist) {
            throw new BadRequestError('The user already exist');
        }

        const authObjectId: ObjectId = new ObjectId();
        const userObjectId: ObjectId = new ObjectId();
        const uId = `${Helpers.generateRandomIntegers(12)}`;
        const authData: IAuthDocument = SignupController.prototype.signUpData({
            _id: authObjectId, uId, username, email, password
        });

        const userDataForDB: IUserDocument = SignupController.prototype.userData(authData, userObjectId);

        // Add to DB
        authQueue.addAuthUserJob('addAuthUserToDB', {value: authData});
        userQueue.addUserJob('addUserToDB', {value: userDataForDB});

        const userJwt: string = SignupController.prototype.signToken(authData, userObjectId);
        req.session = {jwt: userJwt};

        res.status(HTTP_STATUS.CREATED).json({
            message: 'User were created successfully',
            user: userDataForDB,
            token: userJwt
        });
    }

    private signToken(data: IAuthDocument, userObjectId: ObjectId): string {
        return JWT.sign({
            userId: userObjectId,
            uId: data.uId,
            email: data.email,
            username: data.username,
        }, config.JWT_TOKEN!, {expiresIn: config.TOKEN_EXPIRES_IN_HOURS});
    }


    signUpData(data: ISignUpData): IAuthDocument {
        const {_id, username, email, uId, password} = data;
        return {
            _id,
            username: Helpers.firstLetterUppercase(username),
            email: Helpers.lowerCase(email),
            uId,
            password,
            createdAt: new Date()
        } as IAuthDocument;
    }

    private userData(data: IAuthDocument, userObjectId: ObjectId): IUserDocument {
        const {_id, username, email, uId, password} = data;
        return {
            _id: userObjectId,
            authId: _id,
            uId,
            username: Helpers.firstLetterUppercase(username),
            email,
            password,
            profilePicture: 'https://www.vhv.rs/dpng/d/312-3120300_default-profile-hd-png-download.png',
            places: [new Types.ObjectId('655643f1198721ec372a6972')],
        } as unknown as IUserDocument;
    }
}