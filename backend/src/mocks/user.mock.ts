import { IUserDocument } from '@user/interfaces/user.interface';

export const existingUser = {
    _id: '60263f14648fed5246e322d9',
    uId: '1621613119252066',
    username: 'Manny',
    email: 'manny@me.com',
    createdAt: new Date()
} as unknown as IUserDocument;

export const mergedAuthAndUserData = {
    _id: '60263f14648fed5246e322d8',
    authId: '60263f14648fed5246e322d3',
    uId: '1621613119252066',
    username: 'hassonor',
    email: 'orhasson@me.com',
    createdAt: '2022-08-31T07:42:24.451Z'
} as unknown as IUserDocument;


export const userJwt =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
