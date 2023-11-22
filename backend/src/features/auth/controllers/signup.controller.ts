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

export class SignupController {
    @JoiValidation(signupSchema)
    public async create(req: Request, res: Response): Promise<void> {
        const {username, email, password, profilePicture} = req.body;

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

        const result: UploadApiResponse = await uploads(profilePicture, `${userObjectId}`, true, true) as UploadApiResponse;
        if (!result?.public_id) {
            throw new BadRequestError('File upload: Error occurred. Try again.');
        }

        const userDataForDB: IUserDocument = SignupController.prototype.userData(authData, userObjectId);
        userDataForDB.profilePicture = `https://res.cloudinary.com/${config.CLOUD_NAME}/image/upload/v${result.version}/${userObjectId}`;

        // Add to DB
        authQueue.addAuthUserJob('addAuthUserToDB', {value: authData});
        userQueue.addUserJob('addUserToDB', {value: userDataForDB});

        const userJwt: string = SignupController.prototype.signToken(authData, userObjectId);

        res.status(HTTP_STATUS.CREATED).json({
            message: 'User were created successfully',
            user: userDataForDB,
            token: userJwt
        });
    }

    private signToken(data: IAuthDocument, userObjectId: ObjectId): string {
        return JWT.sign({
            userId: userObjectId.toString(),
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
            places: [],
        } as unknown as IUserDocument;
    }
}