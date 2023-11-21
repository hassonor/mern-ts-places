import { Response } from 'express';
import { AuthPayload, IAuthDocument } from '@auth/interfaces/auth.interface';


export const authMockRequest = (sessionData: IJWT, body: IAuthMock, currentUser?: AuthPayload | null, params?: any) => ({
    session: sessionData,
    body,
    params,
    currentUser
});

export const authMockResponse = (): Response => {
    const res: Response = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};


export interface IJWT {
    jwt?: string;
}

export interface IAuthMock {
    _id?: string;
    username?: string;
    email?: string;
    profilePicture?: string;
    uId?: string;
    password?: string;
    createdAt?: Date | string;
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
}

export const authUserPayload: AuthPayload = {
    userId: '60263f14648fed5246e322d9',
    uId: '1621613119252066',
    username: 'hassonor',
    email: 'orhasson@me.com',
    iat: 12345
};

export interface IJWT {
    jwt?: string;
}

export const authMock = {
    _id: '60263f14648fed5246e322d3',
    uId: '1621613119252066',
    username: 'hassonor',
    email: 'orhasson@me.com',
    createdAt: '2022-08-31T07:42:24.451Z',
    save: () => {
    },
    comparePassword: () => false
} as unknown as IAuthDocument;
new Date();
