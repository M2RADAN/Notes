import { NextFunction, Request, Response } from "express";
import { User } from "../../models/user";
import { TUserFnReturn } from "../../models/user/types";

declare global {
	namespace Express {
		interface Request {
			user: TUserFnReturn;
		}
	}
}

export async function withAuth(req: Request, res: Response, next: NextFunction) {
	const user = await User.findUserByJwt(req.cookies.jwt).catch(next);
	if (!user) return;

	req.user = user;

	next();
}
