import { Model, SchemaDefinitionProperty, Document, Types } from "mongoose";

export interface IUser {
	password: string;
	name: string;
	createdAt?: Date;
	notes: Types.ObjectId[];
	tokenIDs: string[];
	avatar?: string;
	_id: string;
}

export type TUserFnReturn = Document<unknown, {}, IUser> &
	IUser &
	Required<{
		_id: string;
	}>;

export interface IUserMethods extends Model<IUser> {
	findUserByCredentials: (name: string, password: string) => Promise<TUserFnReturn>;
	findUserByJwt: (jwt: string) => Promise<TUserFnReturn>;
}
