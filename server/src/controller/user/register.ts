import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../../models/user";
import { RESPONSE } from "../../constants/response";
import { secret } from "../../secrets";

import crypto from "crypto";

export async function userRegiserController(req: Request, res: Response, next: NextFunction) {
	const { name, password } = req.body;

	if (await User.findOne({ name })) {
		return next({
			statusCode: 402,
			message: "Такой пользователь уже существует ",
		});
	}

	bcrypt.hash(password, 10, async (_err, hash) => {
		const tokenID = crypto.randomUUID();

		const user = await User.create({
			name,
			password: hash,
			notes: [],
			createdAt: new Date(),
			tokenIDs: [tokenID],
		}).catch(next);

		if (!user) return;

		res.cookie("jwt", jwt.sign({ userID: user._id, tokenID }, secret, { expiresIn: "24d" }), {
			httpOnly: true,
			secure: true,
			expires: new Date(Date.now() + 24 * 24 * 60 * 60 * 1000),
		});
		res.status(200).send(RESPONSE.SUCCESS);
	});
}
