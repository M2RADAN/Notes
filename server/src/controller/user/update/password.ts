import { RESPONSE } from "../../../constants/response";

import bcrypt from "bcrypt";

import { NextFunction, Request, Response } from "express";

export async function userUpdatePasswordController(req: Request, res: Response, next: NextFunction) {
	const { newPassword, oldPassword } = req.body;
	if (!(await bcrypt.compare(oldPassword, req.user.password))) {
		return next(RESPONSE.INVALID_PARAMS);
	}

	req.user.password = newPassword;

	await req.user.save();

	res.status(200).send(RESPONSE.SUCCESS);
}
