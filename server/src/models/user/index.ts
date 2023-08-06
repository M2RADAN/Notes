import { Schema, model } from "mongoose";
import { IUser, IUserMethods } from "./types";

export const UserSchema = new Schema<IUser, IUserMethods>({
	password: { type: String, required: true },
	name: { type: String, required: true, unique: true },
	createdAt: Date,
	notes: {
		type: [Schema.Types.ObjectId],
		ref: "note",
		required: true,
	},
	tokenIDs: { type: [String], required: true },
	avatar: String,
});

import "./static/find-user-by-jwt";
import "./static/find-user-by-credentials";

export const User = model<IUser, IUserMethods>("user", UserSchema);
