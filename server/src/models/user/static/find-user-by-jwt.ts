import { UserSchema } from "..";
import { AuthorizationError } from "../../../errors/models/AuthorizationError";

import jwt from "jsonwebtoken";
import { secret } from "../../../secrets";
import { TUserFnReturn } from "../types";

UserSchema.static("findUserByJwt", async function (jwtToken: string): Promise<TUserFnReturn> {
	const UserThis = this;

	if (!jwtToken) throw new AuthorizationError("token expired", 403);

	return new Promise((resolve, reject) => {
		jwt.verify(jwtToken, secret, async function (err, decoded) {
			if (err) return reject(new AuthorizationError(err.message, 403));

			if (typeof decoded !== "object") return reject("token malformed");

			const user = await UserThis.findOne({ _id: decoded?.userID }).catch(reject);

			if (!user) return reject("Пользователь не найден");
			if (user.tokenIDs.some((el) => el === decoded.tokenID)) return resolve(user);

			reject("token expired");
		});
	});
});
