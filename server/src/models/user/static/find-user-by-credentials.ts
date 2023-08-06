import { UserSchema } from "..";
import { AuthorizationError } from "../../../errors/models/AuthorizationError";
import { TUserFnReturn } from "../types";

import bcrypt from "bcrypt";

UserSchema.static(
	"findUserByCredentials",
	async function (name: string, password: string): Promise<TUserFnReturn> {
		const user = await this.findOne({ name });

		if (!user) throw new AuthorizationError("Неправильные имя или пароль", 403);

		if (await bcrypt.compare(password, user.password)) {
			return user;
		}

		throw new AuthorizationError("Неправильные имя или пароль", 403);
	}
);
