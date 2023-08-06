import { NextFunction, Request, Response } from "express";
import { User } from "../../models/user";
import jwt from "jsonwebtoken";
import { RESPONSE } from "../../constants/response";
import { secret } from "../../secrets";

import crypto from "crypto";

export async function userLoginController(req: Request, res: Response, next: NextFunction) {
	const { name, password } = req.body;
	const user = await User.findUserByCredentials(name, password).catch(next);

	if (!user) return;
	const tokenID = crypto.randomUUID();

	user.tokenIDs = [...user.tokenIDs, tokenID];
	await user.save().catch(next);

	res.cookie("jwt", jwt.sign({ userID: user._id, tokenID }, secret, { expiresIn: "24d" }), {
		httpOnly: true,
		secure: true,
		sameSite: true,
		expires: new Date(Date.now() + 24 * 24 * 60 * 60 * 1000),
	});
	res.status(200).send(RESPONSE.SUCCESS);
}
