import { IUserDocument } from '@user/interfaces/user.interface';
import mongoose, { model, Model, Schema } from 'mongoose';

const userSchema: Schema = new Schema({
    authId: {type: mongoose.Schema.Types.ObjectId, ref: 'Auth', index: true},
    profilePicture: {type: String, default: ''},
    passwordResetToken: {type: String, default: ''},
    passwordResetExpires: {type: Number},
    places: {type: [mongoose.Schema.Types.ObjectId], ref: 'Place'},
    createdAt: {type: Date, default: Date.now}
});

const UserModel: Model<IUserDocument> = model<IUserDocument>('User', userSchema, 'User');
export { UserModel };