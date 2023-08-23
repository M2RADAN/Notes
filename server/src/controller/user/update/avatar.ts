import { RESPONSE } from "../../../constants/response";

import { NextFunction, Request, Response } from "express";

export async function userUpdateAvatarController(req: Request, res: Response, next: NextFunction) {
	req.user.avatar = req.file?.path;
	await req.user.save();
	res.status(200).send(RESPONSE.SUCCESS);
}
